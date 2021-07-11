import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from "../../../services/auth.service";
import {SignUpComponent} from '../sign-up/sign-up.component';

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
}


