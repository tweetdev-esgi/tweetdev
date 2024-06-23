import { Router } from 'express';
import { saveCode, executeCode } from '../controllers/codeController';

const router = Router();

router.post('/save', saveCode);
router.post('/executeCode', executeCode);

export default router;
