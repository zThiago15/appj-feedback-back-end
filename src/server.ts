import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0f7b8ccef66f85",
    pass: "59e618ecd1fbb3"
  }
});

// create feeedbacks
app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  });

  await transport.sendMail({
    from: 'Equipe Feedget <hey@feedget.com>',
    to: 'Thiago Dias <thiaguinhodias.15@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`, 
      `<p> Tipo do feedback: ${type}`,
      `<p> Comentário: ${comment}`,
      `</div>`
    ].join('\n')
  })

  return res.status(201).json({ data: feedback });
})

app.listen(3333, () => {
  console.log('HTTP server running');
});

