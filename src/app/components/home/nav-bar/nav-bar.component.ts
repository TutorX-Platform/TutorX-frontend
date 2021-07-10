import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaObserver, MediaChange} from '@angular/flex-layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {AuthService} from "../../../services/auth.service";
import { SignInComponent } from '../../auth/sign-in/sign-in.component';
import { SignUpComponent } from '../../auth/sign-up/sign-up.component';
import { AddQuestionComponent } from '../../shared/add-question/add-question.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit, OnDestroy {

  private mediaSub: Subscription | undefined;
  viewPoint = false;

  constructor(
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver,
    public authService: AuthService,
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
    dialogConfig.height = "620px";
    this.dialog.open(SignInComponent, dialogConfig);

  }

  // onSignUp() {
  //   this.authService.SignIn("sandunsameera25@gmail.com", "sandunsameera");
  // }
  

  onSignUp(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "433px";
    dialogConfig.height = "900px";
    this.dialog.open(SignUpComponent, dialogConfig);
  }

}
