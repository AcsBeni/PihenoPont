const express = require('express');
const router = express.Router();
const path = require('path')
const nodemailer = require('nodemailer');
const ejs = require('ejs');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });



router.post('/', async (req, res) => {
    const { to, subject, template, data } = req.body;

    if (!to || !subject || !template) {
        return res.status(400).send({ error: 'Hiányzó adatok!' });
    }
    const mailOptions = {
        from: process.env.ADMINMAIL,
        to: to,
        subject: subject,
        html: await renderTemplate(template, data || {})
    };
    try{
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send({ error: 'Email küldése sikertelen!' });
            } else {
                return res.status(200).send({ message: 'Email sikeresen elküldve!' });
            }
        });

    }
    catch(err){
        return res.status(500).send({ error: 'Hiba történt az email küldése során! ' + err.message });
    }
});


async function renderTemplate(templateName, data) {
    const tmpfile = path.join(__dirname, '../templates/',templateName + '.ejs');
    return await ejs.renderFile(tmpfile, data);
    
}


module.exports = router;