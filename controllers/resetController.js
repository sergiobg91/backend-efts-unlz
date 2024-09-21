import crypto from 'crypto';
import User from '../models/userModel.js'; 
import { sendPasswordResetEmail } from '../services/email.services.js';

// Solicitud de reseteo de contraseña: solicitar token y enviar email
export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    console.log(req.body)
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('No existe un usuario registrado con este email');
        }

        // Generar token de reseteo
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = Date.now() + 3600000; // 1hr
        await user.save();

        // Enviar email
        await sendPasswordResetEmail(user.email, resetToken);

        res.status(200).send('Email de recuperación de contraseña enviado');
    } catch (error) {
        res.status(500).send('Error procesando la solicitud');
    }
};

// Validar token y setear la nueva contraseña
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() },
        });
        
        console.log(user)
        if (!user) {
            return res.status(400).send('Token invalido o expirado');
        }

        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        res.status(200).send('La contraseña ha sido reseteada');
    } catch (error) {
        res.status(500).send('Error reseteando la contraseña');
    }
};
