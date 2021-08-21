import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import * as constants from "../models/constants";
import {Student} from "../models/student";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  uid: string = '';
  abc = new Observable();
  isTutor = false;
  currentStudent: Student = {
    email: "",
    firstName: "",
    isVerified: '',
    lastName: "",
    profileImage: "",
    questions: [],
    uniqueKey: "",
    userId: "",
    role: ''
  };

  constructor(
    public angularFirestoreService: AngularFirestore,
    public angularFireAuth: AngularFireAuth) {
    if (JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user))) {
      this.uid = JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user)).uid;
    }
  }

  getCurrentUserId() {
    if (JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user))) {
      return JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user)).uid;
    } else {
      return null;
    }
  }

  findStudentDetails() {
    if (this.getCurrentUserId() != null) {
      return this.angularFirestoreService.collection(constants.collections.students).doc(this.getCurrentUserId()).valueChanges();
    } else {
      return this.angularFirestoreService.collection(constants.collections.students).doc('ehu').valueChanges();
    }
  }

  findStudentById(uid: string) {
    return this.angularFirestoreService.collection(constants.collections.students).doc(uid).valueChanges();
  }

  addQuestion() {
  }

}
