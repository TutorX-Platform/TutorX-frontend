import {Injectable} from '@angular/core';
import * as constants from '../models/constants';
import * as uuid from 'uuid';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) {
  }

  generateUniqueKey(keyType: string): string {
    const uniqueId = uuid.v4();
    if (keyType === constants.genKey.student) {
      return constants.uniqueIdPrefix.prefixStudent.concat(uniqueId);
    }
    if (keyType === constants.genKey.tutor) {
      return constants.uniqueIdPrefix.prefixTutor.concat(uniqueId);
    }
    if (keyType === constants.genKey.question) {
      return constants.uniqueIdPrefix.prefixQuestion.concat(uniqueId);
    }
    return "";
  }

  generateChatLink(questionId: string) {
    const baseUrl = constants.env_url.local_url;
    return baseUrl.concat('chat/').concat(questionId);
  }

  getTimeFromTimeAPI() {
    return this.http.post(constants.time_url, {});
  }
}
