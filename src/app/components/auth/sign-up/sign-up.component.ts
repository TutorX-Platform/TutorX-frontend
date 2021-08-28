import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthService} from "../../../services/auth.service";
import * as constants from "../../../models/constants";
import {Router} from "@angular/router";
import {ProgressDialogComponent} from "../../shared/progress-dialog/progress-dialog.component";
import {MailService} from "../../../services/mail.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent implements OnInit {
  // @ts-ignore
  signUpForm: FormGroup;
  isChecked = false;
  emailPattern = constants.regexp_patterns.email;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<SignUpComponent>,
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
            this.dialogRef.close();
            this.router.navigate([constants.routes.student_q_pool], {skipLocationChange: true});
          }
        )
      });
  }

  onGoogleAuth() {
    this.authService.googleAuth().then(
      (r) => {
        this.dialogRef.close();
      }
    )
  }

  onFacebookAuth() {
    this.authService.facebookAuth().then(
      (r) => {
        this.dialogRef.close();
      }
    )
  }

}
