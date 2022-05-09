import { MailAdapter, SendMailData } from '../main-adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0f7b8ccef66f85",
    pass: "59e618ecd1fbb3"
  }
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData): Promise<void> {

    await transport.sendMail({
      from: 'Equipe Feedget <hey@feedget.com>',
      to: 'Thiago Dias <thiaguinhodias.15@gmail.com>',
      subject,
      html: body,
    });
  }
}