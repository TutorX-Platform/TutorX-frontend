import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaObserver, MediaChange} from '@angular/flex-layout';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {AuthService} from "../../../services/auth.service";
import {SignInComponent} from '../../auth/sign-in/sign-in.component';
import {SignUpComponent} from '../../auth/sign-up/sign-up.component';
import {StudentService} from "../../../services/student-service.service";
import * as constants from '../../../models/constants';
import {ProgressDialogComponent} from "../../shared/progress-dialog/progress-dialog.component";
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit, OnDestroy {

  private mediaSub: Subscription | undefined;
  viewPoint = false;
  isLoggedIn = false;
  page = 0;

  constructor(
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver,
    public authService: AuthService,
    public studentService: StudentService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        console.log(change.mqAlias);
        if (change.mqAlias == 'xs') {
          this.viewPoint = true;
        } else {
          this.viewPoint = false;
        }
      }
    );
    const progressDailog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDailog.afterOpened().subscribe(
      () => {
        this.getLoggedUser(progressDailog);
      }
    )
    console.log(this.authService.student);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
  }

  onLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "433px";
    // dialogConfig.height = "650px";
    this.dialog.open(SignInComponent, dialogConfig);
  }

  onLoginMobile() {
    this.page = 1;
  }

  onSignUp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "433px";
    // dialogConfig.height = "950px";
    this.dialog.open(SignUpComponent, dialogConfig);
  }

  onSignUpMobile() {
    this.page = 2;
  }

  onHome() {
    this.page = 0;
  }

  onSignOut() {
    this.isLoggedIn = !!localStorage.getItem(constants.localStorageKeys.user);
    this.authService.onSignOut();
  }

  onGoogleSignIn() {
    this.authService.googleAuth().then(
      (r) => {
        console.log(r);
      }
    );
  }

  onTutor() {
    this.router.navigate([constants.routes.turor], {skipLocationChange: true})
  }

  onProfile() {
    this.router.navigate([constants.routes.student_q_pool], {skipLocationChange: true})

  }

  getLoggedUser(progressDialog: MatDialogRef<any>) {
    this.studentService.findStudentDetails().subscribe(
      (res) => {
        console.log(res);
        if (res) {
          // @ts-ignore
          this.studentService.currentStudent = res;
          if (this.studentService.currentStudent.role === constants.userTypes.tutor) {
            console.log('2222222222222222222');
            this.studentService.isTutor = true;
          }
        }
        progressDialog.close();
      }, () => {
        progressDialog.close();
      }, () => {
        progressDialog.close();
      }
    )
  }
}
