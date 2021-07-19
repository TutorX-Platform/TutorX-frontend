import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { MailService } from 'src/app/services/mail.service';
import * as constants from '../../../models/constants';
import { ProgressDialogComponent } from '../../shared/progress-dialog/progress-dialog.component';

@Component({
  selector: 'app-sign-in-mobile',
  templateUrl: './sign-in-mobile.component.html',
  styleUrls: ['./sign-in-mobile.component.scss']
})
export class SignInMobileComponent implements OnInit {

  // @ts-ignore
  signInForm: FormGroup;
  emailPattern = constants.regexp_patterns.email;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public authService: AuthService,
    private mailService: MailService,
  ) {
  }

  ngOnInit(): void {
    this.initializeSignInForm();
  }

  initializeSignInForm() {
    this.signInForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSignIn() {
    if (this.signInForm.valid) {
      const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
      progressDialog.afterOpened().subscribe(
        () => {
          this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password, progressDialog).then(
            (res) => {
              // this.dialogRef.close();
              console.log(res);
            }
          );
        }
      )
    } else {
      alert("please fill form");
    }
  }

  onGoogleSignIn() {
    this.authService.googleAuth().then(r => {
      // this.dialogRef.close();
    });
  }
}
