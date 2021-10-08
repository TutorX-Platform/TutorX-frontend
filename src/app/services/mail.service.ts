import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as constants from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) {
  }


  sendMail(subject: string, reciever: any, replacement: any, fileName: string) {
    const emailData = {
      'fromEmail': constants.email_data.senderEmail,
      'subject': subject,
      'toEmail': reciever,
      'fileName': fileName,
      'replacement': replacement
    }
    return this.http.post(constants.backend_url.concat(constants.backend_api_resource.email), emailData);
  }

}
