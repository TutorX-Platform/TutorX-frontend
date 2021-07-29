import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as constants from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) {
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

}
