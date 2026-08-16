import { Router } from 'express';
import { getProfileById, updateProfile, saveChapter1, saveChapter2 } from '../controllers/profileController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/:id', authenticate, getProfileById);
router.patch('/me', authenticate, updateProfile);
router.post('/onboarding/chapter-1', authenticate, saveChapter1);
router.put('/onboarding/chapter-2', authenticate, saveChapter2);

export default router;
