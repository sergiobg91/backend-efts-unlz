import express from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/resetController.js';

const router = express.Router();

// Solicitar reseteo de contrasenia
router.post('/request-reset-password', requestPasswordReset);

// Resetear la contrasenia
router.post('/reset-password', resetPassword);

export default router;

