require("dotenv").config();
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS, // Seu e-mail
        pass: process.env.EMAIL_PASSWORD, // Sua senha
    },
});

// Função para enviar e-mail
async function enviarEmail(destinatario, assunto, texto) {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS, 
        to: destinatario, 
        subject: assunto, 
        text: texto, 
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado:', info.response);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
}