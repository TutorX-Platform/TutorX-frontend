import {Injectable} from '@angular/core';
import * as constants from '../models/constants';
import * as uuid from 'uuid';
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import * as systemMessages from "../models/system-messages";
import {MessageDialogComponent} from "../components/shared/message-dialog/message-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient, private dialog: MatDialog,) {
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
    const urlParams: any = {};
    const httpOptions = {};
    return this.http.get(constants.backend_url.concat(constants.backend_api_resource.time), httpOptions);
  }

  openDialog(title: string, message: string, type: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: title,
      message: message,
      type: type,
    }
    return this.dialog.open(MessageDialogComponent, dialogConfig);
  }
}
