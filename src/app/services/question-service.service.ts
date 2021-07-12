import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {UtilService} from "./util-service.service";
import * as constants from "../models/constants";
import {Questions} from "../models/questions";
import {Observable} from "rxjs";
import {StudentService} from "./student-service.service";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private angularFirestoreService: AngularFirestore, private studentService: StudentService) {
  }

  saveQuestion(qustion: Questions, questionId: string) {
    const questionRef: AngularFirestoreDocument<Questions> = this.angularFirestoreService.doc(`${constants.collections.questions}/${questionId}`);
    return questionRef.set(qustion);
  }

  getQuestions(studentId: string) {
    // @ts-ignore
    const questionRef: AngularFirestoreDocument<Questions[]> = this.angularFirestoreService.collection(constants.collections.questions, ref => ref.where('studentId', '==', 'S6e3f9e7f-08cd-4e19-b136-8b2cbf05dbb5'));
    return questionRef;
  }
}
