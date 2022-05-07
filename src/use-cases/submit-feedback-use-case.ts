import { MailAdapter } from "../adapters/main-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUserCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUserCase {

  
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUserCaseRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`, 
        `<p> Tipo do feedback: ${type}`,
        `<p> Comentário: ${comment}`,
        `</div>`
      ].join('\n')
      
    })
  }
}