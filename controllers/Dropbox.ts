import { Request, Response, NextFunction } from 'express';
import DBmodels from '../database/DBmodels';
const { File } = DBmodels;





/* ----------------------------------
.        SYNC DROPBOX ACCOUNT
---------------------------------- */
export const connect_and_sync_dropbox = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ error: false, message: 'Dropbox successfully synced' });
  } catch (err: any) {
    console.log(err.message);
    console.log(err);
    res.status(500).json({ error: true, message: err.message || 'Error occurred while processing!' });
  }
}




/* ----------------------------------
.        FTS GET ALL FILES
---------------------------------- */
export const fts_get_all_files = async (req: Request, res: Response) => {
  try {
    const fileRecords = await File.findOne({});
    res.json({ error: false, fileRecords: fileRecords || 'N/A', message: 'Here will come all your files now!' });
  } catch (err: any) {
    console.log(err.message);
    console.log(err);
    res.status(500).json({ error: true, message: err.message || 'Error occurred while processing!' });
  }
}