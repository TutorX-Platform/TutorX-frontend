import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {UtilService} from "./util-service.service";
import * as constants from "../models/constants";
import {Questions} from "../models/questions";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private angularFirestoreService: AngularFirestore) {
  }

  saveQuestion(qustion: Questions, questionId: string) {
    const questionRef: AngularFirestoreDocument<any> = this.angularFirestoreService.doc(`${constants.collections.questions}/${questionId}`);
    return questionRef.set(qustion);
  }
}
