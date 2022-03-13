import fs from 'fs';
import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import { Dropbox } from 'dropbox';

import { downloadFile, getAccessToken, getUserFiles, getViewLink } from '../../utils/helpers/DropboxHelpers';
import { sequelize } from '../../database/DBmodels';
import { extractBufferText } from '../../utils/helpers/ExtractText';

/* ----------------------------------
.       sync dropbox account

. Ques: What does it do?
. 1. Get a temporary auth code of a user's dropbox account from oauth
. 2. Validate and use it to get the real authentication token
. 3. Use the token to get all files recursively
. 4. Extract the text content out of the files and index it
    (it will only extract ".pdf", ".doc" and ".docx" files)
    (for other files it will ignore, but can add support for that)
. 5. Do bulk upsertion on a big chunk 
    (reducing DB calls and improving performance)
. 6. Once done, inform user that the syncing is complete

. NOTE: Each extraction is independant 
  so even if one fails it won't affect 
  the upsertion of other files :)
---------------------------------- */

export const connect_and_sync_dropbox = async (req: Request, res: Response) => {
  try {
    const { code } = req.body || {};
    if (!code) return res.status(400).json({ error: true, message: 'Please provide a code!' });

    const authRes: any = await getAccessToken(code);
    const { error: authError, access_token: accessToken } = authRes || {};
    if (authError) return res.status(400).json(authRes);

    // create dbx instance for this user
    const dbx = new Dropbox({
      accessToken: accessToken,
      clientId: process.env.MY_APP_KEY,
      clientSecret: process.env.MY_APP_SECRET,
    });

    const filesResult = await getUserFiles(dbx);
    const files = filesResult?.entries || [];

    /*
      IMPORTANT NOTE: This following SQL insertion method is used for performance
      1. We will be generating a bulk upsert SQL query for 100s of items
      2. If is 100th or last item, we'll run this SQL
      3. If not, we'll keep building it
      
      QUES: Why are we using it?
      If we upsert one by one, it'll impact on performance (multiple db calls)

      QUES: Why not use Sequelize bulkCreate({},{updateOnDuplicate})?
      Imagine we have thousands of files in the account, using that will bulk upsert all
      In some cases it can impact on DB.

      Conclusion: Why are we using it?
      We are using it for bulk upserting a lot of records 
      Buut not all of them at once. We are bulk upserting in big chunks
    */
    let bulkFileUpsertReplacements = {};
    let valSqlArr = [];
    let fileRecUpsertSQL = '';

    const filesLength = files.length;
    for (let i = 0; i < filesLength; i++) {
      const item = files[i]
      console.log({
        fileName: item.name,
      })
      if (!item?.name?.endsWith('.pdf') && item?.name?.endsWith('.doc') && item?.name?.endsWith('.docx')) continue;

      // get view link and extracted text
      const [viewLinkRes, downloadedFile] = await Promise.all([
        getViewLink(dbx, item.path_lower),
        downloadFile(dbx, item.path_lower),
      ]);
      const { link } = viewLinkRes || {};
      const { name: fileName, fileBinary } = downloadedFile || {};
      const extractedText = fileBinary && await extractBufferText(fileName, fileBinary);

      if (extractedText) {
        try {
          // generate SQL for this item
          const metaStr = `
            (
              :dropbox_file_id${i},
              :file_path${i}, :url${i},
              :file_name${i}, :content${i},
              :dropbox_updated_at${i}
            )
          `;
          const itemReplacements = {
            [`dropbox_file_id${i}`]: downloadedFile.id,
            [`file_path${i}`]: downloadedFile.path_lower,
            [`url${i}`]: link,
            [`file_name${i}`]: downloadedFile.name,
            [`content${i}`]: 'extractedText',
            [`dropbox_updated_at${i}`]: downloadedFile.server_modified,
          };
          valSqlArr.push(metaStr);
          bulkFileUpsertReplacements = {
            ...bulkFileUpsertReplacements,
            ...itemReplacements,
          }

          // if 100th or last item run the SQL
          if ((i !== 0 && i % 100 === 0) || i === filesLength - 1) {
            // make sql stmt complete and insert and empty array
            fileRecUpsertSQL = `
              INSERT INTO hris.files
                (
                  dropbox_file_id,
                  file_path, url,
                  file_name, content,
                  dropbox_updated_at
                )
              VALUES
            `;
            fileRecUpsertSQL += valSqlArr.join(',');
            fileRecUpsertSQL += `
              ON CONFLICT(dropbox_file_id) DO UPDATE SET
              file_path=excluded.file_path,
              url=excluded.url,
              file_name=excluded.file_name,
              content=excluded.content,
              dropbox_updated_at=excluded.dropbox_updated_at;
            `;
            await sequelize.query(fileRecUpsertSQL, {
              type: QueryTypes.INSERT,
              replacements: bulkFileUpsertReplacements,
            });
            valSqlArr = [];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    return res.status(200).json({ error: false, message: 'Dropbox successfully synced' });
  } catch (err: any) {
    console.error(err.message);
    console.error(err);
    return res.status(500).json({ error: true, message: err.message || 'Error occurred while processing!' });
  }
}