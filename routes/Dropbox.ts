import { Router } from 'express';
import * as dropboxController from '../controllers/Dropbox';
const router = Router();


router.get('/files', dropboxController.fts_get_all_files);
router.post('/sync', dropboxController.connect_and_sync_dropbox);



export default router;