import { createTransport } from "nodemailer";



const sendEmailForContact = async (text,email,subject) => {
  const transport = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service:process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_SENDER_EMAIL,
      pass: process.env.SMTP_SENDER_PASS
    },
  });

  await transport.sendMail({
    subject:subject,
    from: process.env.SMTP_SENDER_EMAIL, // sender address
    to: email, // list of receivers shamim@cyverotechnologies.com
    text, // plain text body
  });
};

export default sendEmailForContact;
