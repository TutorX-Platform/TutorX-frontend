import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from "@angular/router";
import {User} from "../models/user";
import {UtilService} from "./util-service.service";
import 'rxjs/add/operator/switchMap';
import {Student} from "../models/student";
import * as constants from '../models/constants';
import * as firebase from 'firebase';
import {MatDialogRef} from "@angular/material/dialog";
import {MailService} from "./mail.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  isStudentSet = false;
  isLoggedIn = false;
  student: Student = {
    email: "",
    firstName: "",
    isVerified: "",
    lastName: "",
    profileImage: "",
    questions: [],
    uniqueKey: "",
    userId: "",
    role: "",
  };

  constructor(public angularFirestoreService: AngularFirestore,
              public angularFireAuth: AngularFireAuth,
              public router: Router,
              public utilService: UtilService,
              private mailService: MailService,
              public ngZone: NgZone) {
    this.angularFireAuth.authState.subscribe(user => {
      console.log("auth service");
      if (user) {
        // @ts-ignore
        this.student.userId = user?.uid;
        // @ts-ignore
        this.student.email = user?.email;
        // @ts-ignore
        this.student.profileImage = user?.photoURL;
        console.log(this.student);
        this.userData = user;
        this.isLoggedIn = true;
        localStorage.setItem(constants.localStorageKeys.user, JSON.stringify(this.userData));
        `JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user));`
      } else {
        this.isLoggedIn = false;
        localStorage.removeItem(constants.localStorageKeys.user);
      }
    });
  }

  googleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  oAuthLogin(provider: any) {
    return this.angularFireAuth.auth.signInWithPopup(provider).then((credentials => {
      if (credentials.user) {
        localStorage.setItem(constants.localStorageKeys.user, JSON.stringify(credentials.user));
        `JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user));`
        this.userData = credentials.user;
        // @ts-ignore
        this.mailService.sendEmail(credentials.user.email).subscribe();
        this.ngZone.run(() => {
          this.isLoggedIn = true;
          this.router.navigate([constants.routes.student_q_pool]);
        });
        // @ts-ignore
        this.updateStudentData(credentials.user);
        // @ts-ignore
        this.student.email = credentials.user?.email;
        // @ts-ignore
        this.student.firstName = credentials.user?.displayName;
        // @ts-ignore
        this.student.profileImage = credentials.user?.photoURL;
        // @ts-ignore
        this.student.userId = credentials.user?.uid;
        this.isStudentSet = true;
      }
      // this.ngZone.run(() => {
      //   this.router.navigate([constants.routes.student_q_pool]);
      // });
    }))
  }

  updateStudentData(user: User) {
    const studentRef: AngularFirestoreDocument<Student> = this.angularFirestoreService.doc(constants.collections.students + `/${user.uid}`);
    const student: Student = {
      email: user.email,
      firstName: user.displayName,
      isVerified: user.emailVerified,
      lastName: user.displayName,
      profileImage: '',
      questions: [],
      uniqueKey: this.generateUniqueKey(),
      userId: user.uid,
      role: constants.userTypes.student,
    }
    studentRef.set(student).then(r => console.log(r));
  }

  generateUniqueKey() {
    return this.utilService.generateUniqueKey(constants.genKey.student);
  }

  // Sign in with email/password
  signIn(email: string, password: string, progressDialog: MatDialogRef<any>) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          localStorage.setItem(constants.localStorageKeys.user, JSON.stringify(result.user));
          `JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user));`
          this.userData = result.user;
          this.ngZone.run(() => {
            this.isLoggedIn = true;
            progressDialog.close();
            this.router.navigate([constants.routes.student_q_pool]);
          });
        }
        // this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  signUp(email: string, password: string, firstName: string, progressDialog: MatDialogRef<any>) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.isLoggedIn = true;
        this.SendVerificationMail();
        // @ts-ignore
        this.SetUserData(result.user, firstName);
        progressDialog.close();
      }).catch((error) => {
        window.alert(error.message)
        progressDialog.close();

      })
  }

  SendVerificationMail() {
    // @ts-ignore
    return this.angularFireAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate([constants.routes.student_q_pool]);
      })
  }

  // Sign out
  signOut() {
    return this.angularFireAuth.auth.signOut().then(() => {
      this.isLoggedIn = false;
      localStorage.removeItem(constants.localStorageKeys.user);
      this.router.navigate([constants.routes.sign_in]);
    })
  }

  SetUserData(user: any, firstName: string) {
    this.userData = user;
    const userRef: AngularFirestoreDocument<any> = this.angularFirestoreService.doc(`${constants.collections.students}/${user.uid}`);
    const userData: Student = {
      email: user.email,
      firstName: firstName,
      isVerified: "",
      lastName: firstName,
      profileImage: user.photoURL,
      questions: [],
      uniqueKey: this.utilService.generateUniqueKey(constants.userTypes.student),
      userId: user.uid,
      role: constants.userTypes.student
    }
    this.student = userData;
    return userRef.set(userData, {
      merge: true
    });
  }

  getAuthenticated() {
    return this.angularFireAuth.authState.subscribe(
      (res) => {
        return res;
      }
    );
  }

  onSignOut() {
    this.isLoggedIn = false;
    localStorage.removeItem(constants.localStorageKeys.user);
    this.angularFireAuth.auth.signOut().then(
      (v) => {
        this.angularFireAuth.auth.onAuthStateChanged(
          (user) => {
            if (user) {
              console.log('signed In');
            } else {
              this.resetStudent();
            }
          }
        )
      }
    );
  }

  resetStudent() {
    const resetUser: Student = {
      email: "",
      firstName: "",
      isVerified: "",
      lastName: "",
      profileImage: "",
      questions: [],
      uniqueKey: "",
      userId: "",
      role: '',
    }

    this.student = resetUser;
  }

}
