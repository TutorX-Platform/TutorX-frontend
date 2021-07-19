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
      'email': email,
      'subject': constants.email_data.subject,
      'message': constants.email_data.message,
      'sender': constants.email_data.senderEmail,
      'senderPassword': constants.email_data.senderPassword,
    }
    return this.http.post(constants.service_url.emailBackend, emailData);
  }


}
