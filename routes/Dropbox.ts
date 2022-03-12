import { Router } from 'express';
import * as dropboxController from '../controllers/dropbox';
const router = Router();


router.get('/files', dropboxController.get_all_dropbox_files);
router.post('/sync', dropboxController.connect_and_sync_dropbox);



export default router;