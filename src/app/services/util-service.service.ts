import {Injectable} from '@angular/core';
import * as constants from '../models/constants';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() {
  }

  generateUniqueKey(userType: string): string {
    const uniqueId = uuid.v4();
    if (userType === constants.userTypes.student) {
      return constants.uniqueIdPrefix.prefixStudent.concat(uniqueId);
    }
    if (userType === constants.userTypes.tutor) {
      return constants.uniqueIdPrefix.prefixTutor.concat(uniqueId);
    }
    return "";
  }
}
