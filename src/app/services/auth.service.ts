import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from "@angular/router";
import {User} from "../models/user";

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
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(<string>localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', '');
        JSON.parse(<string>localStorage.getItem('user'));
      }
    })
  }


  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['sign-in']);
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
    const userRef: AngularFirestoreDocument<any> = this.angularFirestoreService.doc(`users/${user.uid}`);
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
        this.router.navigate(['dummy']);
      })
  }

  // Sign out
  SignOut() {
    return this.angularFireAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

  reloadCurrentUser() {
    console.log("aaaaaaaaaaaaaaa");
    this.angularFireAuth.auth.currentUser?.reload().catch((res) => {
      console.log(res);
    });
  }
}
