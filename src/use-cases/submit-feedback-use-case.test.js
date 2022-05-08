import { SubmitFeedbackUserCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUserCase(
  { create: createFeedbackSpy},
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback ', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example',
      screenshot: 'data:image/png;base64453ghjg76a43453'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit without a type', async () => {

    await expect(submitFeedback.execute({
      type: '',
      comment: 'example',
      screenshot: 'data:image/png;base64453ghjg76a43453'
    })).rejects.toThrow();
  });

  it('should not be able to submit without comment', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64453ghjg76a43453'
    })).rejects.toThrow(); // don't reach end of code and throw an error
  });

  it('should not be able to submit with an invalid screenshot', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'tudo bugado',
      screenshot: 'teste.png'
    })).rejects.toThrow(); // don't reach end of code and throw an error
  });

})

