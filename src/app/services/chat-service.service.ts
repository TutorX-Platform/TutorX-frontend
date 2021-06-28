import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {ChatMsg} from "../models/chat-msg";
import * as constants from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(public angularFirestoreService: AngularFirestore) {
  }

  saveMsg(msg: ChatMsg, chatId: string) {
    const chatRef: AngularFirestoreDocument<any> = this.angularFirestoreService.doc(`${constants.collections.chats}/${chatId}`).collection(constants.collections.chats).doc(Date.now().toString());
    chatRef.set(msg);
  }
}
