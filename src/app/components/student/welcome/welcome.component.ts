import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from 'src/app/services/auth.service';
import * as constants from "../../../models/constants";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  emailForm!: FormGroup;
  disableDone = true;
  emailPattern = constants.regexp_patterns.email;


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<WelcomeComponent>,
    public authService: AuthService
  ) {
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  onDone() {
    if (this.emailForm.value.email !== '' && this.emailForm.value.name != '') {
      this.dialogRef.close(this.emailForm);
    }
  }

  onClose(){
    this.dialogRef.close();
  }

}
