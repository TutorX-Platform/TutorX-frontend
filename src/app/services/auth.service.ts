import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from "@angular/router";
import {User} from "../models/user";
import {Observable} from "rxjs";
import * as constants from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(public angularFirestoreService: AngularFirestore,
              public angularFireAuth: AngularFireAuth,
              public router: Router,
              public ngZone: NgZone) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem(constants.localStorageKeys.user, JSON.stringify(this.userData));
        JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user));
      } else {
        localStorage.setItem(constants.localStorageKeys.user, '');
        JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user));
      }
    })
  }


  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate([constants.routes.dummy]);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
        console.log(result);
      }).catch((error) => {
        window.alert(error.message)
      })
  }


  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestoreService.doc(`${constants.collections.users}/${user.uid}`);
    const userData: User = {
      photoUrl: '',
      // photoUrl: user.photoUrl,
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified
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
  SignOut() {
    return this.angularFireAuth.auth.signOut().then(() => {
      localStorage.removeItem(constants.localStorageKeys.user);
      this.router.navigate([constants.routes.sign_in]);
    })
  }

  reloadCurrentUser() {
    this.angularFireAuth.auth.currentUser?.reload().catch((res) => {
      console.log(res);
    });
  }

  getTestData(chatToken: string): Observable<unknown[]> {
    return this.angularFirestoreService.collection(constants.collections.chats).doc(chatToken).collection(constants.collections.chats).valueChanges();
  }

}
