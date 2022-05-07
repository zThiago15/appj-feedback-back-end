import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUserCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUserCase {

  
  constructor(
    private feedbacksRepository: FeedbacksRepository
  ) {}

  async execute(request: SubmitFeedbackUserCaseRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })
  }
}