import express from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/resetController.js';

const router = express.Router();

// Solicitar reseteo de contrasena
router.post('/request-reset-password', requestPasswordReset);

// Resetear la contrasena
router.post('/reset-password', resetPassword);

export default router;

