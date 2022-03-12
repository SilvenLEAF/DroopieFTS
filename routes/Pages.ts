


import path from 'path';
import { Router, Request, Response, NextFunction } from 'express';
import * as dropboxController from '../controllers/Dropbox';
const router = Router();



router.get('/sync', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, '../client/sync.html'));
});

router.get('/files', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, '../client/files.html'));
});



export default router;