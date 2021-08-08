import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {UtilService} from "./util-service.service";
import * as constants from "../models/constants";
import {Questions} from "../models/questions";
import {Observable} from "rxjs";
import {StudentService} from "./student-service.service";
import {ChatServiceService} from "./chat-service.service";
import {MailService} from "./mail.service";
import {Question} from "../models/question";
import {MatDialogRef} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  // @ts-ignore
  question: Questions;

  constructor(private angularFirestoreService: AngularFirestore,
              private chatService: ChatServiceService,
              private mailService: MailService) {
  }

  getQuestionById(questionId: string) {
    // @ts-ignore
    const questionRef: AngularFirestoreDocument<Questions[]> = this.angularFirestoreService.collection(constants.collections.questions).doc(questionId);
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
    const questionRef: AngularFirestoreDocument<Questions[]> = this.angularFirestoreService.collection(constants.collections.questions, ref => ref.where('tutorId', '==', tutorId).where('status', '==', constants.questionStatus.assigned));
    return questionRef;
  }

  joinTutorForQuestion(questionId: string, tutorId: string, studentEmail: string, dialogRef: MatDialogRef<any>, tutorName: string, tutorImage: string) {
    const data = {
      status: constants.questionStatus.assigned,
      tutorId: tutorId,
      tutorName: tutorName,
      tutorImage: tutorImage
    }
    this.angularFirestoreService.collection(constants.collections.questions).doc(questionId).update(data).then((v) => {
      this.chatService.tutorJoinChat(questionId);
      this.mailService.sendQuestionAcceptMail(studentEmail).subscribe();
      dialogRef.close();
    })
  }

  updateQuestion(questionId: string, data: any) {
    this.angularFirestoreService.collection(constants.collections.questions).doc(questionId).update(data).then((v) => {
      console.log(v);
    })
  }

}
