const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle email sending
app.post('/send-email', async(req, res) => {
    const { name, email, phone, subject, message } = req.body;

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vlogeshwaran77@gmail.com', // Your Gmail
            pass: 'logesh@6380100', // App-specific password or Gmail password
        },
    });

    const mailOptions = {
        from: email,
        to: 'vlogeshwaran77@gmail.com', // Replace with your recipient email
        subject: subject,
        text: `You have a new message from ${name} (${email}, ${phone}):\n\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});