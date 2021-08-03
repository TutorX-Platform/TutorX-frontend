import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import * as constants from '../models/constants';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Chat} from "../models/chat";
import {ChatMsg} from "../models/chat-msg";

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
      isTutorJoinMessage: false,
      isAttachment: false,
      message: message,
      senderEmail: this.auth.student.email,
      senderId: this.auth.student.userId,
      sentBy: this.auth.student.firstName,
      time: new Date().getTime()
    }
    this.angularFirestoreService.collection(constants.collections.message).doc(messageId).collection('chats').add(data);
  }

  getMessages(messageId: string) {
    // @ts-ignore
    const questionRef = this.angularFirestoreService.collection(constants.collections.message).doc(messageId).collection('chats', ref =>
      ref.orderBy('time', 'asc'));
    return questionRef;
  }

  tutorJoinChat(chatId: string) {
    const joinTutor = {
      chatStatus: constants.chat_status.ongoing,
      tutorId: this.auth.student.userId,
      tutorJoinedTime: new Date().getTime(),
      tutorsCount: 1
    }
    this.angularFirestoreService.collection(constants.collections.chats).doc(chatId).update(joinTutor);
  }

  getChat(chatId: string) {
    const chatRef = this.angularFirestoreService.collection(constants.collections.chats).doc(chatId);
    return chatRef;
  }



}
