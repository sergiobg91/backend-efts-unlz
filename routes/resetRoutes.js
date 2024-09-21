import express from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/resetController.js';

const router = express.Router();

// Solicitar reseteo de contraseña
router.post('/request-reset-password', requestPasswordReset);

// Resetear la contraseña
router.post('/reset-password', resetPassword);

export default router;

