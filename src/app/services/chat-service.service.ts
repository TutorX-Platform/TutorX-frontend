import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import * as constants from '../models/constants';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Chat} from "../models/chat";
import {ChatMsg} from "../models/chat-msg";
import {StudentService} from "./student-service.service";
import {UtilService} from "./util-service.service";
import {MailService} from "./mail.service";

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(public angularFirestoreService: AngularFirestore,
              private auth: AuthService,
              private studentService: StudentService,
              private utilService: UtilService,
              private router: Router) {
  }

  createChat(chatId: string, data: Chat) {
    this.angularFirestoreService.collection(constants.collections.chats).doc(chatId).set(data).then(v => {
      console.log(v);
    })
  }

  sendMessage(messageId: string, message: string, sortTime: number, isAttachment: boolean) {
    let data: ChatMsg = {
      sort: sortTime,
      senderAvatar: this.studentService.currentStudent.profileImage,
      senderName: this.studentService.currentStudent.firstName,
      isTutorJoinMessage: false,
      isAttachment: isAttachment,
      message: message,
      senderEmail: this.auth.student.email,
      senderId: this.auth.student.userId,
      sentBy: this.auth.student.firstName,
      time: sortTime
    }
    this.angularFirestoreService.collection(constants.collections.message).doc(messageId).collection(constants.collections.chats).add(data);
  }

  getMessages(messageId: string) {
    // @ts-ignore
    const questionRef = this.angularFirestoreService.collection(constants.collections.message).doc(messageId).collection(constants.collections.chats, ref =>
      ref.orderBy('time', 'asc'));
    return questionRef;
  }

  tutorJoinChat(chatId: string, sortTime: number) {
    const joinTutor = {
      chatStatus: constants.chat_status.ongoing,
      tutorId: this.auth.student.userId,
      tutorJoinedTime: Date.now(),
      tutorsCount: 1
    }
    let data: ChatMsg = {
      sort: sortTime,
      senderAvatar: this.studentService.currentStudent.profileImage,
      senderName: this.studentService.currentStudent.firstName,
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `${this.studentService.currentStudent.firstName} joined the chat`,
      senderEmail: '',
      senderId: '',
      sentBy: '',
      time: sortTime,
    }
    this.angularFirestoreService.collection(constants.collections.chats).doc(chatId).update(joinTutor);
    this.angularFirestoreService.collection(constants.collections.message).doc(chatId).collection(constants.collections.chats).add(data);

  }

  getChat(chatId: string) {
    const chatRef = this.angularFirestoreService.collection(constants.collections.chats).doc(chatId);
    return chatRef;
  }

  tutorLeftChat(chatId: string, time: number) {
    let data: ChatMsg = {
      sort: time,
      senderAvatar: this.studentService.currentStudent.profileImage,
      senderName: this.studentService.currentStudent.firstName,
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `${this.studentService.currentStudent.firstName} left the chat`,
      senderEmail: '',
      senderId: '',
      sentBy: '',
      time: time,
    }

    const leaveTutor = {
      chatStatus: constants.chat_status.openForTutors,
      tutorId: '',
      tutorJoinedTime: time,
      tutorsCount: 1
    }

    this.angularFirestoreService.collection(constants.collections.chats).doc(chatId).update(leaveTutor);
    this.angularFirestoreService.collection(constants.collections.message).doc(chatId).collection(constants.collections.chats).add(data).then(
      (v) => {
        this.router.navigate([constants.routes.turor], {skipLocationChange: true})
      }
    );
  }

  sendQuoteMessage(chatId: string, time: number, amount: number) {
    let data: ChatMsg = {
      sort: time,
      senderAvatar: '',
      senderName: '',
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `${this.studentService.currentStudent.firstName} sent the quote of ${amount} USD`,
      senderEmail: '',
      senderId: '',
      sentBy: '',
      time: time,
    }
    this.angularFirestoreService.collection(constants.collections.message).doc(chatId).collection(constants.collections.chats).add(data);
  }

  sendApproveQuoteMessage(chatId: string, time: number, amount: number) {
    let data: ChatMsg = {
      sort: time,
      senderAvatar: '',
      senderName: '',
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `${this.studentService.currentStudent.firstName} approved quote of ${amount} USD`,
      senderEmail: '',
      senderId: '',
      sentBy: '',
      time: time,
    }
    this.angularFirestoreService.collection(constants.collections.message).doc(chatId).collection(constants.collections.chats).add(data);
  }

  sendPaidQuoteMessage(chatId: string, time: number, amount: number) {
    let data: ChatMsg = {
      sort: time,
      senderAvatar: '',
      senderName: '',
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `${this.studentService.currentStudent.firstName} Paid quote ${amount} USD`,
      senderEmail: '',
      senderId: '',
      sentBy: '',
      time: time,
    }
    this.angularFirestoreService.collection(constants.collections.message).doc(chatId).collection(constants.collections.chats).add(data);
  }


}
