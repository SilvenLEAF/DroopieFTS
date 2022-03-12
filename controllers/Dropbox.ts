import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import { Dropbox } from 'dropbox';
import moment from 'moment';
import { downloadFile, getAccessToken, getUserFiles, getViewLink } from '../utils/helpers/DropboxHelpers';
import DBmodels from '../database/DBmodels';
import { extractBufferText } from '../utils/helpers/ExtractText';
const { File } = DBmodels;




/* ----------------------------------
.        SYNC DROPBOX ACCOUNT
---------------------------------- */
export const connect_and_sync_dropbox = async (req: Request, res: Response) => {
  try {
    const { code } = req.body || {};
    if (!code) return res.status(400).json({ error: true, message: 'Please provide a code!' });

    console.log({ code });
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

    for (let item of files) {
      if (!item?.name?.endsWith('.pdf') && item?.name?.endsWith('.doc') && item?.name?.endsWith('.docx')) continue;

      // get view link and extracted text
      const [viewLinkRes, downloadedFile] = await Promise.all([
        getViewLink(dbx, item.path_lower),
        downloadFile(dbx, item.path_lower),
      ]);
      const { link } = viewLinkRes || {};
      const { name: fileName, fileBinary } = downloadedFile || {};
      const extractedText = fileBinary && await extractBufferText(fileName, fileBinary);
      console.log({ extractedText });

      extractedText && await File.upsert({
        dropboxFileId: downloadedFile.id,
        fileName: downloadedFile.name,
        filePath: downloadedFile.path_lower,
        url: link,
        dropboxUpdatedAt: new Date(downloadedFile.server_modified),
        content: extractedText,
      });
    }

    return res.status(200).json({ error: false, message: 'Dropbox successfully synced' });
  } catch (err: any) {
    console.log(err.message);
    console.log(err);
    return res.status(500).json({ error: true, message: err.message || 'Error occurred while processing!' });
  }
}




/* ----------------------------------
.        FTS GET ALL FILES
---------------------------------- */
export const fts_get_all_files = async (req: Request, res: Response) => {
  try {
    const fileRecords = await File.findOne({});
    return res.json({ error: false, fileRecords: fileRecords || 'N/A', message: 'Here will come all your files now!' });
  } catch (err: any) {
    console.log(err.message);
    console.log(err);
    return res.status(500).json({ error: true, message: err.message || 'Error occurred while processing!' });
  }
}