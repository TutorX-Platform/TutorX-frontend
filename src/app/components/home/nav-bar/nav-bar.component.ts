import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaObserver, MediaChange} from '@angular/flex-layout';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {AuthService} from "../../../services/auth.service";
import {SignInComponent} from '../../auth/sign-in/sign-in.component';
import {SignUpComponent} from '../../auth/sign-up/sign-up.component';
import {AddQuestionComponent} from '../../shared/add-question/add-question.component';
import * as constants from "../../../models/constants";
import {StudentService} from "../../../services/student-service.service";
import {Student} from "../../../models/student";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit, OnDestroy {

  private mediaSub: Subscription | undefined;
  viewPoint = false;
  currentStudent: Student = {
    email: "",
    firstName: "",
    isVerified: false,
    lastName: "",
    profileImage: "",
    questions: [],
    uniqueKey: "",
    userId: ""
  };

  constructor(
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver,
    public authService: AuthService,
    private studentService: StudentService,
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
        console.log(this.viewPoint);
      }
    );

    this.findStudent();

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
  }

  onLogin() {
    // this.authService.SignIn("sandun25@gmail.com", "sandunsameera");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "433px";
    dialogConfig.height = "560px";
    this.dialog.open(SignInComponent, dialogConfig);

  }

  onSignUp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "433px";
    dialogConfig.height = "860px";
    this.dialog.open(SignUpComponent, dialogConfig);
  }

  onSignOut() {
    console.log("hi");
    // this.authService.signOut().then(r => {
    //   this.authService.userData = null;
    //   localStorage.removeItem(constants.localStorageKeys.user);
    //   console.log(localStorage.removeItem(constants.localStorageKeys.user));
    // });
    // console.log(this.authService.userData);

  }

  findStudent() {
    this.studentService.findStudentDetails().subscribe(
      (res) => {
        // @ts-ignore
        this.currentStudent = res;
        console.log(res);
      }
    )
  }

}
