import nodemailer from 'nodemailer';

export const sendPasswordResetEmail = async (email, resetToken) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Código ${resetToken}`,
        text: `Has solicitado restablecer tu contraseña. El código es: ${resetToken}`,
        html: `<p>Has solicitado restablecer tu contraseña. El código es: ${resetToken}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo de restablecimiento de contraseña enviado a:', email);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};
