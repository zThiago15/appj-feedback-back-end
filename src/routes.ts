import express from 'express'; 
import nodemailer from 'nodemailer';
import { prisma } from './prisma';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUserCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

const transport =   nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0f7b8ccef66f85",
    pass: "59e618ecd1fbb3"
  }
});

// create feeedbacks
routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()

  const submitFeedbackUseCase = new SubmitFeedbackUserCase(prismaFeedbacksRepository)

  await submitFeedbackUseCase.execute({
    type, 
    comment,
    screenshot
  });

  // await transport.sendMail({
  //   from: 'Equipe Feedget <hey@feedget.com>',
  //   to: 'Thiago Dias <thiaguinhodias.15@gmail.com>',
  //   subject: 'Novo feedback',
  //   html: [
  //     `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`, 
  //     `<p> Tipo do feedback: ${type}`,
  //     `<p> Comentário: ${comment}`,
  //     `</div>`
  //   ].join('\n')
  // })

  return res.status(201).send();
})