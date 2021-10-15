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
import {url_sign} from "../models/constants";

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
    const typing = {
      isTyping: false
    }
    this.angularFirestoreService.collection(constants.collections.chats).doc(chatId).set(data).then();
    this.angularFirestoreService.collection(constants.collections.chatTyping).doc(chatId).set(typing).then();
  }

  sendMessage(messageId: string, message: string, sortTime: number, isAttachment: boolean, attachmentLink: string, extension: string, senderName: string) {
    let data: ChatMsg = {
      isValidQuote: false,
      isQuote: false,
      attachmentExtension: extension,
      attachmentLink: attachmentLink,
      sort: sortTime,
      senderAvatar: this.studentService.currentStudent.profileImage,
      senderName: senderName,
      isTutorJoinMessage: false,
      isAttachment: isAttachment,
      message: message,
      senderEmail: this.auth.student.email,
      senderId: this.auth.student.userId,
      sentBy: this.auth.student.firstName,
      time: sortTime
    }
    if (isAttachment) {
      this.angularFirestoreService.collection(constants.collections.message).doc(messageId).collection(constants.collections.chats).add(data);
    } else {
      this.angularFirestoreService.collection(constants.collections.message).doc(messageId).collection(constants.collections.chats).add(data);
    }
  }

  getMessages(messageId: string) {
    // @ts-ignore
    const questionRef = this.angularFirestoreService.collection(constants.collections.message).doc(messageId).collection(constants.collections.chats, ref =>
      ref.orderBy('time', 'asc').limitToLast(7));
    return questionRef;
  }

  getNextMessages(messageId: string, lastDoc: any) {
    // @ts-ignore
    const questionRef = this.angularFirestoreService.collection(constants.collections.message).doc(messageId).collection(constants.collections.chats, ref =>
      ref.orderBy('time', 'asc').limitToLast(7).endBefore(lastDoc));
    return questionRef;
  }

  tutorJoinChat(chatId: string, sortTime: number) {
    const joinTutor = {
      chatStatus: constants.chat_status.ongoing,
      tutorId: this.auth.student.userId,
      tutorJoinedTime: Date.now(),
      tutorsCount: 1,
      tutorProfile: this.auth.student.profileImage,
      tutorEmail: this.studentService.currentStudent.email,
    }
    let data: ChatMsg = {
      isValidQuote: false,
      isQuote: false,
      attachmentExtension: "",
      attachmentLink: "",
      sort: sortTime,
      senderAvatar: this.studentService.currentStudent.profileImage,
      senderName: this.auth.student.visibleName,
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `${this.auth.student.visibleName} joined the chat`,
      senderEmail: '',
      senderId: '',
      sentBy: '',
      time: sortTime
    }
    this.angularFirestoreService.collection(constants.collections.chats).doc(chatId).update(joinTutor);
    this.angularFirestoreService.collection(constants.collections.message).doc(chatId).collection(constants.collections.chats).add(data);

  }

  deadLineChangedChat(chatId: string, sortTime: number, deadline: string) {
    let data: ChatMsg = {
      isValidQuote: false,
      isQuote: false,
      attachmentExtension: "",
      attachmentLink: "",
      sort: sortTime,
      senderAvatar: this.studentService.currentStudent.profileImage,
      senderName: this.studentService.currentStudent.firstName,
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `${this.studentService.currentStudent.firstName} changed the dead line to ${deadline}`,
      senderEmail: '',
      senderId: '',
      sentBy: '',
      time: sortTime
    }
    return this.angularFirestoreService.collection(constants.collections.message).doc(chatId).collection(constants.collections.chats).add(data);
  }

  getChat(chatId: string) {
    const chatRef = this.angularFirestoreService.collection(constants.collections.chats).doc(chatId);
    return chatRef;
  }

  tutorLeftChat(chatId: string, time: number) {
    let data: ChatMsg = {
      isValidQuote: false,
      isQuote: false,
      attachmentExtension: "", attachmentLink: "",
      sort: time,
      senderAvatar: this.studentService.currentStudent.profileImage,
      senderName: this.studentService.currentStudent.firstName,
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `${this.auth.student.visibleName} left the chat`,
      senderEmail: '',
      senderId: '',
      sentBy: '',
      time: time
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

  requestedNewTutor(chatId: string, time: number) {
    let data: ChatMsg = {
      isValidQuote: false,
      isQuote: false,
      attachmentExtension: "", attachmentLink: "",
      sort: time,
      senderAvatar: this.studentService.currentStudent.profileImage,
      senderName: this.studentService.currentStudent.firstName,
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `${this.studentService.currentStudent.firstName} requested a new tutor to the question `,
      senderEmail: '',
      senderId: '',
      sentBy: '',
      time: time
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
        this.router.navigate([constants.routes.student.concat(constants.url_sign.url_separator).concat(constants.routes.questions)], {skipLocationChange: true})
      }
    );
  }

  sendQuoteMessage(chatId: string, time: number, amount: number, senderAvatar: string) {
    let data: ChatMsg = {
      isValidQuote: true,
      isQuote: true,
      attachmentExtension: "",
      attachmentLink: "",
      sort: time,
      senderAvatar: senderAvatar,
      senderName: this.auth.student.visibleName,
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `${amount}`,
      senderEmail: '',
      senderId: this.studentService.currentStudent.userId,
      sentBy: '',
      time: time
    }
    this.angularFirestoreService.collection(constants.collections.message).doc(chatId).collection(constants.collections.chats).add(data);
  }

  sendApproveQuoteMessage(chatId: string, time: number, amount: number) {
    let data: ChatMsg = {
      isValidQuote: false,
      isQuote: false,
      attachmentExtension: "",
      attachmentLink: "",
      sort: time,
      senderAvatar: '',
      senderName: '',
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `${this.studentService.currentStudent.firstName} approved quote of ${amount} USD`,
      senderEmail: '',
      senderId: '',
      sentBy: '',
      time: time
    }
    this.angularFirestoreService.collection(constants.collections.message).doc(chatId).collection(constants.collections.chats).add(data);
  }

  sendPaidQuoteMessage(chatId: string, time: number, amount: number) {
    let data: ChatMsg = {
      isValidQuote: false,
      isQuote: false,
      attachmentExtension: "",
      attachmentLink: "",
      sort: time,
      senderAvatar: '',
      senderName: '',
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `${this.studentService.currentStudent.firstName} Paid quote ${amount} USD`,
      senderEmail: '',
      senderId: '',
      sentBy: '',
      time: time
    }
    this.angularFirestoreService.collection(constants.collections.message).doc(chatId).collection(constants.collections.chats).add(data);
  }

  onTyping(chatId: string, isTyping: boolean) {
    const data = {
      isTyping: isTyping
    }
    this.angularFirestoreService.collection(constants.collections.chatTyping).doc(chatId).update(data);
  }

  getTypingStatus(chatId: string) {
    const typeRef = this.angularFirestoreService.collection(constants.collections.chatTyping).doc(chatId);
    return typeRef;
  }

  getChatsForTutor(tutorId: string) {
    const typeRef = this.angularFirestoreService.collection(constants.collections.chats, ref => ref.where('tutorId', '==', tutorId).orderBy('tutorJoinedTime', 'desc').limit(4))
    return typeRef;
  }

  getAllChatsForTutor(tutorId: string) {
    const typeRef = this.angularFirestoreService.collection(constants.collections.chats, ref => ref.where('tutorId', '==', tutorId).orderBy('tutorJoinedTime', 'desc'))
    return typeRef;
  }

  chatSeenUpdate(chatId: string, data: any) {
    this.angularFirestoreService.collection(constants.collections.chats).doc(chatId).update(data);
  }

  markAsCompletedMessage(question: string, time: number) {
    const data = {
      isQuote: false,
      attachmentExtension: "",
      attachmentLink: "",
      sort: time,
      senderAvatar: this.studentService.currentStudent.profileImage,
      senderName: this.studentService.currentStudent.firstName,
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `${this.auth.student.visibleName} Marked as completed`,
      senderEmail: '',
      senderId: '',
      sentBy: '',
      time: time
    }
    return this.angularFirestoreService.collection(constants.collections.message).doc(question).collection(constants.collections.chats).add(data);
  }

  MarkAsCompleted(chatToken: string) {
    const chatData = {
      chatStatus: constants.chat_status.closed,
    }
    return this.angularFirestoreService.collection(constants.collections.chats).doc(chatToken).update(chatData);
  }


}
