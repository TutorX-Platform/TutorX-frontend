import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from "@angular/router";
import {User} from "../models/user";
import {Observable} from "rxjs";
import * as constants from '../models/constants';
import {Student} from "../models/student";
import {UtilService} from "./util-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(public angularFirestoreService: AngularFirestore,
              public angularFireAuth: AngularFireAuth,
              public router: Router,
              public utilService: UtilService,
              public ngZone: NgZone) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem(constants.localStorageKeys.user, JSON.stringify(this.userData));
        `JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user));`
      } else {
        localStorage.setItem(constants.localStorageKeys.user, '');
        JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user));
      }
    })
  }


  // Sign in with email/password
  signIn(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate([constants.routes.dummy]);
        });
        // this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  signUp(email: string, password: string, firstName: string, lastName: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user, firstName, lastName);
        console.log(result);
      }).catch((error) => {
        window.alert(error.message)
      })
  }


  SetUserData(user: any, firstName: string, lastName: string) {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestoreService.doc(`${constants.collections.students}/${user.uid}`);
    const userData: Student = {
      email: user.email,
      firstName: firstName,
      isVerified: true,
      lastName: lastName,
      profileImage: '',
      questions: [],
      uniqueKey: this.utilService.generateUniqueKey(constants.userTypes.student),
      userId: user.uid
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  SendVerificationMail() {
    // @ts-ignore
    return this.angularFireAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate([constants.routes.dummy]);
      })
  }

  // Sign out
  signOut() {
    return this.angularFireAuth.auth.signOut().then(() => {
      localStorage.removeItem(constants.localStorageKeys.user);
      this.router.navigate([constants.routes.sign_in]);
    })
  }

  // reloadCurrentUser() {
  //   this.angularFireAuth.auth.currentUser?.reload().catch((res) => {
  //     console.log(res);
  //   });
  // }

  getTestData(chatToken: string): Observable<unknown[]> {
    return this.angularFirestoreService.collection(constants.collections.chats).doc(chatToken).collection(constants.collections.chats).valueChanges();
  }

}
