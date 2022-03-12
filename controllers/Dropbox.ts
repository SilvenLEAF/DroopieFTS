import { Request, Response, NextFunction } from 'express';



/* ----------------------------------
.        SYNC DROPBOX ACCOUNT
---------------------------------- */
export const connect_and_sync_dropbox = async (req: Request, res: Response, next: NextFunction)=>{
  try {
      res.status(200).json({error: false, message: 'Dropbox successfully synced'});
  } catch (err) {
    next({err, req, res});
  }
}




/* ----------------------------------
.        FTS GET ALL FILES
---------------------------------- */
export const fts_get_all_files = async (req: Request, res: Response, next: NextFunction)=>{
  try {
      res.status(200).json({error: false, message: 'Here will come all your files!'});
  } catch (err) {
    next({err, req, res});
  }
}