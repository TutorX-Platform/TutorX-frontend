import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import * as constants from "../../../models/constants";
import * as sysMsg from "../../../models/system-messages";
import {AuthService} from "../../../services/auth.service";
import {UtilService} from "../../../services/util-service.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  // @ts-ignore
  forgotPasswordForm: FormGroup;
  emailPattern = constants.regexp_patterns.email;
  validations = sysMsg.validations;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<ForgetPasswordComponent>,
    private utilService: UtilService,
    private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.initializeSignUpForm();
  }

  initializeSignUpForm() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', Validators.required),
    });
  }

  onClick() {
    this.authService.resetPassword(this.forgotPasswordForm.controls.email.value).then(() => {
      this.dialogRef.close();
        this.utilService.openDialog(sysMsg.signInTitles.pwResetSent,sysMsg.signInTitles.pwResetSent,constants.messageTypes.success).afterClosed().subscribe();
      }
    );
  }

}
