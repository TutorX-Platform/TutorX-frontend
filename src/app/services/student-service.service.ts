import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "./auth.service";
import * as constants from "../models/constants";
import {Student} from "../models/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    public angularFirestoreService: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    private authService: AuthService,
  ) {
  }

  getCurrentUserId() {
    return JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user)).uid;
  }

  findStudentDetails() {
    return this.angularFirestoreService.collection('student').doc(this.getCurrentUserId()).valueChanges();
  }

  addQuestion(data: any) {
    return this.angularFirestoreService.collection('student').doc(this.getCurrentUserId()).set({questions: data}, {merge: true});
  }

}
