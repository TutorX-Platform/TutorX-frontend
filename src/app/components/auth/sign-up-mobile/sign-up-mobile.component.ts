import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MailService } from 'src/app/services/mail.service';
import * as constants from "../../../models/constants";
import { ProgressDialogComponent } from '../../shared/progress-dialog/progress-dialog.component';

@Component({
  selector: 'app-sign-up-mobile',
  templateUrl: './sign-up-mobile.component.html',
  styleUrls: ['./sign-up-mobile.component.scss']
})
export class SignUpMobileComponent implements OnInit {

  // @ts-ignore
  signUpForm: FormGroup;
  isChecked = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    public authService: AuthService,
    private mailService: MailService
  ) {
  }

  ngOnInit(): void {
    this.initializeSignUpForm();
  }

  initializeSignUpForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  // @ts-ignore
  onAgreement(event) {
    console.log(event.checked);
  }

  onSignUp() {
    console.log(this.isChecked);
    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(
      () => {
        this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password, this.signUpForm.value.fullName, progressDialog).then((e) => {
            this.mailService.sendEmail(this.signUpForm.value.email).subscribe(
              (res) => {
                console.log(res);
              }
            );
            this.router.navigate([constants.routes.student_q_pool],{skipLocationChange: true});
          }
        )
      });
  }

  onGoogleAuth() {
    this.authService.googleAuth().then(
      (r) => {
      }
    )
  }

}
