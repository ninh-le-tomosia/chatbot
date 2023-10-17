import express from 'express';
import usersController from '../controllers/users.controllers';
import { upload } from '../../utils/upload';
const router = express.Router({ mergeParams: true });

router.post('/chat', usersController.chat);
router.post('/upload', upload.single('field_file'), usersController.upload);

export default router;
