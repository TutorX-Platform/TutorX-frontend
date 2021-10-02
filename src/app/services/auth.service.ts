import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from "@angular/router";
import {User} from "../models/user";
import {UtilService} from "./util-service.service";
import 'rxjs/add/operator/switchMap';
import {Student} from "../models/student";
import * as constants from '../models/constants';
import * as sysMsg from '../models/system-messages';
import * as firebase from 'firebase';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MailService} from "./mail.service";
import {StudentService} from "./student-service.service";
import {ProgressDialogComponent} from "../components/shared/progress-dialog/progress-dialog.component";


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
              private dialog: MatDialog,
              private studentService: StudentService,
              public ngZone: NgZone) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        // @ts-ignore
        this.student.userId = user?.uid;
        // @ts-ignore
        this.student.email = user?.email;
        // @ts-ignore
        this.student.profileImage = user?.photoURL;
        this.userData = user;
        this.isLoggedIn = true;
        localStorage.setItem(constants.localStorageKeys.user, JSON.stringify(this.userData));
        `JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user));`
        localStorage.setItem(constants.localStorageKeys.role, this.student.role);
        this.findUser(this.student.userId);
      } else {
        this.isLoggedIn = false;
        localStorage.removeItem(constants.localStorageKeys.user);
      }
    });
  }

  googleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider).catch((err) => {
      this.utilService.openDialog(sysMsg.signInTitles.signInFailed, err.message, constants.messageTypes.warningInfo).afterOpened().subscribe();
    });
  }

  facebookAuth() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider).catch((err) => {
      this.utilService.openDialog(sysMsg.signInTitles.signInFailed, err.message, constants.messageTypes.warningInfo).afterOpened().subscribe();

    });
  }

  oAuthLogin(provider: any) {
    return this.angularFireAuth.auth.signInWithPopup(provider).then((credentials => {
      if (credentials.user) {
        localStorage.setItem(constants.localStorageKeys.user, JSON.stringify(credentials.user));
        `JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user));`
        this.userData = credentials.user;
        const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
        this.roleBasedRouting(credentials.user.uid, progressDialog);
        // @ts-ignore
        this.student.email = credentials.user?.email;
        // @ts-ignore
        this.student.firstName = credentials.user?.displayName;
        // @ts-ignore
        this.student.profileImage = credentials.user?.photoURL;
        // @ts-ignore
        this.student.userId = credentials.user?.uid;
        this.isStudentSet = true;
        this.SetUserData(credentials.user, this.student.firstName);
      }
    }));
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
    studentRef.set(student);
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
          this.roleBasedRouting(result.user.uid, progressDialog);
        }
      }).catch((error) => {
        progressDialog.close();
        this.utilService.openDialog(sysMsg.signInTitles.signInFailed, error.message, constants.messageTypes.warningInfo).afterOpened().subscribe();
      })
  }

  // Sign up with email/password
  signUp(email: string, password: string, firstName: string, progressDialog: MatDialogRef<any>) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // @ts-ignore
        this.mailService.sendMail("Welcome to Tutetory", result.user?.email, constants.getWelcomeQuestion(result.user?.displayName), constants.mailTemplates.welcome).subscribe()
        this.isLoggedIn = true;
        this.SendVerificationMail();
        // @ts-ignore
        this.SetUserData(result.user, firstName);
        // @ts-ignore
        this.roleBasedRouting(result.user.uid, progressDialog);
      }).catch((error) => {
        this.utilService.openDialog(sysMsg.signInTitles.signInFailed, error.message, constants.messageTypes.warningInfo).afterOpened().subscribe();
        progressDialog.close();
      })
  }

  SendVerificationMail() {
    // @ts-ignore
    return this.angularFireAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate([constants.routes.student_q_pool], {skipLocationChange: true});
      })
  }

  // Sign out
  signOut() {
    return this.angularFireAuth.auth.signOut().then(() => {
      this.isLoggedIn = false;
      localStorage.removeItem(constants.localStorageKeys.user);
      this.router.navigate([constants.routes.home], {skipLocationChange: true});
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
    return this.angularFireAuth.authState !== null;
  }

  onSignOut() {
    this.isLoggedIn = false;
    localStorage.removeItem(constants.localStorageKeys.user);
    this.angularFireAuth.auth.signOut().then(
      (v) => {
        this.router.navigate([constants.routes.home])
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

  roleBasedRouting(uid: string, progressDialog: MatDialogRef<any>) {
    this.studentService.findStudentById(uid).subscribe(
      (res) => {
        if (res) {
          // @ts-ignore
          const student: Student = res;
          this.student = student;
          if (student.role === constants.userTypes.student) {
            this.ngZone.run(() => {
              this.isLoggedIn = true;
              if (progressDialog) {
                progressDialog.close();
              }
              this.router.navigate([constants.routes.student_q_pool], {skipLocationChange: true});
            });
          } else if (student.role === constants.userTypes.tutor) {
            this.ngZone.run(() => {
              this.isLoggedIn = true;
              if (progressDialog) {
                progressDialog.close();
              }
              this.router.navigate([constants.routes.turor + '/questions'], {skipLocationChange: true});
            });
          }
        } else {
          progressDialog.close();
        }
      }
    )
  }

  findUser(userId: string) {
    this.studentService.findStudentById(userId).subscribe(
      (res) => {
        // @ts-ignore
        this.student = res;
        // @ts-ignore
        this.studentService.currentStudent = res;
        console.log(res);
      }
    )
  }

}
