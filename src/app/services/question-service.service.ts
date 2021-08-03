import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {UtilService} from "./util-service.service";
import * as constants from "../models/constants";
import {Questions} from "../models/questions";
import {Observable} from "rxjs";
import {StudentService} from "./student-service.service";
import {ChatServiceService} from "./chat-service.service";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private angularFirestoreService: AngularFirestore, private chatService: ChatServiceService) {
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
    const questionRef: AngularFirestoreDocument<Questions[]> = this.angularFirestoreService.collection(constants.collections.questions, ref => ref.where('tutorId', '==', tutorId).where('status', '==', constants.questionStatus.in_progress));
    return questionRef;
  }

  joinTutorForQuestion(questionId: string, tutorId: string) {
    const data = {
      status: constants.questionStatus.in_progress,
      tutorId: tutorId
    }

    this.angularFirestoreService.collection(constants.collections.questions).doc(questionId).update(data).then((v) => {
      this.chatService.tutorJoinChat(questionId);
    })
  }

}
