import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {UtilService} from "./util-service.service";
import * as constants from "../models/constants";
import {Questions} from "../models/questions";
import {ChatServiceService} from "./chat-service.service";
import {MailService} from "./mail.service";
import {MatDialogRef} from "@angular/material/dialog";
import {TimeApi} from "../models/time-api";
import * as systemMessage from '../models/system-messages'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  // @ts-ignore
  question: Questions;
  time: TimeApi = {status: "", time: 0}

  constructor(private angularFirestoreService: AngularFirestore,
              private chatService: ChatServiceService,
              private utilService: UtilService,
              private mailService: MailService) {
  }

  getQuestionById(questionId: string) {
    // @ts-ignore
    const questionRef: AngularFirestoreDocument<Questions> = this.angularFirestoreService.collection(constants.collections.questions).doc(questionId);
    return questionRef;

  }

  saveQuestion(qustion: Questions, questionId: string) {
    const questionRef: AngularFirestoreDocument<Questions> = this.angularFirestoreService.doc(`${constants.collections.questions}/${questionId}`);
    return questionRef.set(qustion);
  }

  getQuestionsForStudent(studentEmail: string) {
    // @ts-ignore
    const questionRef: AngularFirestoreDocument<Questions[]> = this.angularFirestoreService.collection(constants.collections.questions, ref => ref.where('studentEmail', '==', studentEmail));
    return questionRef;
  }

  getQuestions() {
    // @ts-ignore
    const questionRef: AngularFirestoreDocument<Questions[]> = this.angularFirestoreService.collection(constants.collections.questions, ref => ref.where('status', '==', constants.questionStatus.open).where('tutorId', '==', ''));
    return questionRef;
  }

  getQuestionsForTutor(tutorId: string) {
    // @ts-ignore
    const questionRef: AngularFirestoreDocument<Questions[]> = this.angularFirestoreService.collection(constants.collections.questions, ref => ref.where('tutorId', '==', tutorId));
    return questionRef;
  }

  joinTutorForQuestion(questionId: string, tutorId: string, studentEmail: string, dialogRef: MatDialogRef<any>, tutorName: string, tutorImage: string) {
    const data = {
      status: constants.questionStatus.assigned,
      tutorId: tutorId,
      lastAssignedTutorName: tutorName,
      lastAssignedTutorImage: tutorImage,
      tutorName: tutorName,
      tutorImage: tutorImage
    }
    this.angularFirestoreService.collection(constants.collections.questions).doc(questionId).update(data).then((v) => {
      this.utilService.getTimeFromTimeAPI().subscribe((res) => {
        // @ts-ignore
        this.time = res;
        this.chatService.tutorJoinChat(questionId, this.time.time);
      })
      this.mailService.sendQuestionAcceptMail(studentEmail).subscribe();
      dialogRef.close();
    })
  }

  updateQuestion(questionId: string, data: any) {
    this.angularFirestoreService.collection(constants.collections.questions).doc(questionId).update(data).then((v) => {
      console.log(v);
    })
  }

  releaseQuestionByTutor(questionId: string, data: any) {
    this.updateQuestion(questionId, data);
  }

  deleteQuestionByStudent(questionId: string) {
    this.angularFirestoreService.collection(constants.collections.questions).doc(questionId).delete();
    this.angularFirestoreService.collection(constants.collections.chats).doc(questionId).delete();
  }

  tutorSendQuote(questionId: string, data: any) {
    this.angularFirestoreService.collection(constants.collections.questions).doc(questionId).update(data).then((v) => {
      this.utilService.openDialog(systemMessage.questionTitles.studentQuoteApproved,systemMessage.questionMessages.questionSavedSuccessfully,constants.messageTypes.success).afterOpened().subscribe()
    })
  }

  studentApproveQuote(questionId: string, data: any) {
    this.angularFirestoreService.collection(constants.collections.questions).doc(questionId).update(data).then((v) => {
      this.utilService.openDialog(systemMessage.questionTitles.studentQuoteApproved,systemMessage.questionMessages.questionSavedSuccessfully,constants.messageTypes.success).afterOpened().subscribe()
    })
  }

}
