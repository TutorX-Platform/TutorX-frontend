import {Injectable} from '@angular/core';
import * as constants from '../models/constants';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() {
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
}
