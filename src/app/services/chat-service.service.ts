import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import * as constants from '../models/constants';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Chat} from "../models/chat";
import {ChatMsg} from "../models/chat-msg";
import {Questions} from "../models/questions";

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(public angularFirestoreService: AngularFirestore, private auth: AuthService, private router: Router) {
  }

  createChat(chatId: string, data: Chat) {
    this.angularFirestoreService.collection(constants.collections.chats).doc(chatId).set(data).then(v => {
      console.log(v);
    })
  }

  sendMessage(messageId: string, message: string) {
    let data: ChatMsg = {
      isAttachment: false,
      message: message,
      senderEmail: this.auth.student.email,
      senderId: this.auth.student.userId,
      sentBy: this.auth.student.firstName,
      time: new Date().getTime(),
    }
    this.angularFirestoreService.collection(constants.collections.message).doc(messageId).collection('chats').add(data);
  }

  getMessages(messageId: string) {
    // @ts-ignore
    const questionRef = this.angularFirestoreService.collection(constants.collections.message).doc(messageId).collection('chats');
    return questionRef;
  }
}
