import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent implements OnInit {
  // @ts-ignore
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SignUpComponent>,
    public authService: AuthService
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

  onSignUp() {
    // console.log(this.signUpForm.value.email, this.signUpForm.value.password);
    this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password, this.signUpForm.value.fullName, this.signUpForm.value.fullName).then(() => {
      console.log("done");
    });
  }


}
