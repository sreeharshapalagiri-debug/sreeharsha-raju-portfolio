const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "Please complete the form and try again." });
        }

        // Create a transporter using SMTP
        // NOTE: For Gmail, you might need an App Password or use OAuth2
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS  // Your email password or app password
            }
        });

        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: 'sreeharsha.palagiri@gmail.com',
            subject: `New contact from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            replyTo: email
        };

        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: "Message sent successfully!" });
        } catch (error) {
            console.error("Error sending mail:", error);
            return res.status(500).json({ error: "There was a problem with your submission, please try again." });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
