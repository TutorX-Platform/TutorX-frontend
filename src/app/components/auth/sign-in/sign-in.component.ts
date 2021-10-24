import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthService} from "../../../services/auth.service";
import {SignUpComponent} from '../sign-up/sign-up.component';
import * as constants from '../../../models/constants';
import * as sysMsg from '../../../models/system-messages';
import {ProgressDialogComponent} from "../../shared/progress-dialog/progress-dialog.component";
import {MailService} from "../../../services/mail.service";
import {UtilService} from "../../../services/util-service.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  // @ts-ignore
  signInForm: FormGroup;
  emailPattern = constants.regexp_patterns.email;
  validations = sysMsg.validations;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<SignInComponent>,
    public authService: AuthService,
    private mailService: MailService,
    private utilService: UtilService,
  ) {
  }

  ngOnInit(): void {
    this.initializeSignInForm();
  }

  initializeSignInForm() {
    this.signInForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSignIn() {
    if (this.signInForm.valid) {
      const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
      progressDialog.afterOpened().subscribe(
        () => {
          this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password, progressDialog).then(
            (res) => {
              this.dialogRef.close();
            },
          );
        }
      )
    } else {
      this.utilService.openDialog(sysMsg.signInTitles.signInFailed, sysMsg.signInMessages.incompleteForm, constants.messageTypes.warningInfo).afterOpened().subscribe();
    }
  }

  onGoogleSignIn() {
    this.authService.googleAuth().then(r => {
      this.dialogRef.close();
    });
  }

  onFacebookSignIn() {
    this.authService.facebookAuth().then(r => {
      this.dialogRef.close();
    });
  }
}


