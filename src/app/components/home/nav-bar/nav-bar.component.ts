import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaObserver, MediaChange} from '@angular/flex-layout';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {AuthService} from "../../../services/auth.service";
import {SignInComponent} from '../../auth/sign-in/sign-in.component';
import {SignUpComponent} from '../../auth/sign-up/sign-up.component';
import {StudentService} from "../../../services/student-service.service";
import * as constants from '../../../models/constants';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit, OnDestroy {

  private mediaSub: Subscription | undefined;
  viewPoint = false;
  isLoggedIn = false;

  constructor(
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver,
    public authService: AuthService,
    public studentService: StudentService,
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
    this.getLoggedUser();
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
    dialogConfig.height = "620px";
    this.dialog.open(SignInComponent, dialogConfig);

  }

  onSignUp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "433px";
    dialogConfig.height = "900px";
    this.dialog.open(SignUpComponent, dialogConfig);
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

  getLoggedUser() {
    this.studentService.findStudentDetails().subscribe(
      (res) => {
        // @ts-ignore
        this.studentService.currentStudent = res;
      }
    )
  }
}
