import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthService} from "../../../services/auth.service";
import {SignUpComponent} from '../sign-up/sign-up.component';
import * as util from '../../../models/util';
import {ProgressDialogComponent} from "../../shared/progress-dialog/progress-dialog.component";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  // @ts-ignore
  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<SignInComponent>,
    public authService: AuthService
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
    this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password);
    this.dialogRef.close();
  }

  onGoogleSignIn() {
    const progressDialog = this.dialog.open(ProgressDialogComponent, util.getProgressDialogData());
    progressDialog.afterOpened().subscribe(
      () => {
        this.authService.googleAuth(progressDialog).then(r => console.log(r));
      }
    )
  }
}


