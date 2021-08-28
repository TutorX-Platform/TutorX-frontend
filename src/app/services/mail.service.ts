import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as constants from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) {
  }

  if() {

  }

  sendEmail(email: string) {
    const emailData = {
      'fromEmail': constants.email_data.senderEmail,
      'subject': constants.email_data.subject,
      'text': constants.email_data.message,
      'toEmail': email,
    }
    return this.http.post(constants.backend_url.concat(constants.backend_api_resource.email), emailData);
  }

  sendQuestionAcknowledgementEmail(email: string) {
    const emailData = {
      'fromEmail': constants.email_data.senderEmail,
      'subject': constants.email_data.subject,
      'text': constants.email_data.message,
      'toEmail': email,
    }
    return this.http.post(constants.backend_url.concat(constants.backend_api_resource.email), emailData);
  }

  sendQuestionAcceptMail(email: string) {
    const emailData = {
      'fromEmail': constants.email_data.senderEmail,
      'subject': constants.email_data.questionAcceptSubject,
      'text': constants.email_data.message,
      'toEmail': email,
    }
    return this.http.post(constants.backend_url.concat(constants.backend_api_resource.email), emailData);

  }

  sendQuoteMailToStudent(email: string) {
    const emailData = {
      'fromEmail': constants.email_data.senderEmail,
      'subject': constants.email_data.tutorSendQuote,
      'text': constants.email_data.tutorSendQuoteMessage,
      'toEmail': email,
    }
    return this.http.post(constants.backend_url.concat(constants.backend_api_resource.email), emailData);

  }

  quoteApprovalMailToTutor(email: string) {
    const emailData = {
      'fromEmail': constants.email_data.senderEmail,
      'subject': constants.email_data.tutorSendQuote,
      'text': constants.email_data.tutorSendQuoteMessage,
      'toEmail': email,
    }
    return this.http.post(constants.backend_url.concat(constants.backend_api_resource.email), emailData);

  }

  paymentSuccessMailToTutor(email: string) {
    const emailData = {
      'fromEmail': constants.email_data.senderEmail,
      'subject': constants.email_data.paymentSuccessMailSubjectToTutor,
      'text': constants.email_data.paymentSuccessMailMessageToTutor,
      'toEmail': email,
    }
    return this.http.post(constants.backend_url.concat(constants.backend_api_resource.email), emailData);

  }

  paymentSuccessMailToStudent(email: string) {
    const emailData = {
      'fromEmail': constants.email_data.senderEmail,
      'subject': constants.email_data.paymentSuccessMailSubjectToStudent,
      'text': constants.email_data.paymentSuccessMailMessageToStudent,
      'toEmail': email,
    }
    return this.http.post(constants.backend_url.concat(constants.backend_api_resource.email), emailData);
  }

  paymentFailedMailToStudent(email: string) {
    const emailData = {
      'fromEmail': constants.email_data.senderEmail,
      'subject': constants.email_data.failedSuccessMailSubjectToStudent,
      'text': constants.email_data.failedSuccessMailSubjectToStudent,
      'toEmail': email,
    }
    return this.http.post(constants.backend_url.concat(constants.backend_api_resource.email), emailData);
  }

  questionAddedEmailToNotLoggedUser(email: string) {
    const emailData = {
      'fromEmail': constants.email_data.senderEmail,
      'subject': constants.email_data.subject,
      'text': constants.email_data.questionAddMailNotLoggedUser,
      'toEmail': email,
    }
    return this.http.post(constants.backend_url.concat(constants.backend_api_resource.email), emailData);
  }

  tutorJoinedFor(email: string, chatLink: string) {
    const emailData = {
      'fromEmail': constants.email_data.senderEmail,
      'subject': constants.email_data.subject,
      'text': constants.email_data.questionAcceptEmail + ' use below link to join chat ' + `${chatLink}`,
      'toEmail': email,
    }
    return this.http.post(constants.backend_url.concat(constants.backend_api_resource.email), emailData);
  }

  chatWarningEmail(questionId: string, sender: string, keyword: string) {
    const emailData = {
      'fromEmail': constants.email_data.senderEmail,
      'subject': 'UnAuthorized chats shared in chat',
      'text': `${sender} sheared ${keyword} which is an unauthorized keyword. Please put some attention on ${questionId} question chat `,
      'toEmail': 'tharindu.prf@gmail.com',
    }
    return this.http.post(constants.backend_url.concat(constants.backend_api_resource.email), emailData);
  }

}
