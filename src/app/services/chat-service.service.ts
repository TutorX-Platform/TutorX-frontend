import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import * as constants from '../models/constants';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Chat} from "../models/chat";
import {ChatMsg} from "../models/chat-msg";
import {StudentService} from "./student-service.service";

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(public angularFirestoreService: AngularFirestore,
              private auth: AuthService,
              private studentService: StudentService,
              private router: Router) {
  }

  createChat(chatId: string, data: Chat) {
    this.angularFirestoreService.collection(constants.collections.chats).doc(chatId).set(data).then(v => {
      console.log(v);
    })
  }

  sendMessage(messageId: string, message: string) {
    let data: ChatMsg = {
      senderAvatar: this.studentService.currentStudent.profileImage,
      senderName: this.studentService.currentStudent.firstName,
      isTutorJoinMessage: false,
      isAttachment: false,
      message: message,
      senderEmail: this.auth.student.email,
      senderId: this.auth.student.userId,
      sentBy: this.auth.student.firstName,
      time: Date.now(),
    }
    this.angularFirestoreService.collection(constants.collections.message).doc(messageId).collection(constants.collections.chats).add(data);
  }

  getMessages(messageId: string) {
    // @ts-ignore
    const questionRef = this.angularFirestoreService.collection(constants.collections.message).doc(messageId).collection(constants.collections.chats, ref =>
      ref.orderBy('time', 'desc'));
    return questionRef;
  }

  tutorJoinChat(chatId: string) {
    const joinTutor = {
      chatStatus: constants.chat_status.ongoing,
      tutorId: this.auth.student.userId,
      tutorJoinedTime: Date.now(),
      tutorsCount: 1
    }
    let data: ChatMsg = {
      senderAvatar: this.studentService.currentStudent.profileImage,
      senderName: this.studentService.currentStudent.firstName,
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `${this.studentService.currentStudent.firstName} joined the chat`,
      senderEmail: '',
      senderId: '',
      sentBy: '',
      time: Date.now()
    }
    this.angularFirestoreService.collection(constants.collections.chats).doc(chatId).update(joinTutor);
    this.angularFirestoreService.collection(constants.collections.message).doc(chatId).collection(constants.collections.chats).add(data);

  }

  getChat(chatId: string) {
    const chatRef = this.angularFirestoreService.collection(constants.collections.chats).doc(chatId);
    return chatRef;
  }


}
