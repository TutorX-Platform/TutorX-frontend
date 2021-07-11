import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {UtilService} from "./util-service.service";
import * as constants from "../models/constants";
import {Questions} from "../models/questions";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private angularFirestoreService: AngularFirestore) {
  }

  saveQuestion(qustion: Questions, questionId: string) {
    const questionRef: AngularFirestoreDocument<Questions> = this.angularFirestoreService.doc(`${constants.collections.questions}/${questionId}`);
    return questionRef.set(qustion);
  }

  getQuestions(studentId: string) {
    // @ts-ignore
    const questionRef: Observable<Questions[]> = this.angularFirestoreService.collection(constants.collections.questions, ref => ref.where('studentId', '==', 'Sf6d69825-8271-4f0d-9568-2a7ec5b0bb76')).valueChanges();
    return questionRef;
  }
}
