import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as constants from "../../../models/constants";
import * as sysMsg from "../../../models/system-messages";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
// @ts-ignore
  forgotPasswordForm: FormGroup;
  emailPattern = constants.regexp_patterns.email;
  validations = sysMsg.validations;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.initializeSignUpForm();
  }

  initializeSignUpForm() {
    this.forgotPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onClick(){

  }
}
