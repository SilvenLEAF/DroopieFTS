


import path from 'path';
import { Router, Request, Response, NextFunction } from 'express';
const router = Router();



router.get('/sync', (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).sendFile(path.join(__dirname, '../client/sync.html'));
  } catch (err: any) {
    console.log(err.message);
    console.log(err);
    return res.status(500).json({ error: true, message: err.message || 'Error occurred while processing!' });
  }
});

router.get('/files', (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).sendFile(path.join(__dirname, '../client/files.html'));
  } catch (err: any) {
    console.log(err.message);
    console.log(err);
    return res.status(500).json({ error: true, message: err.message || 'Error occurred while processing!' });
  }
});



export default router;