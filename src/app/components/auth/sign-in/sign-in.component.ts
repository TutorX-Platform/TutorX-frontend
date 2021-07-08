import {Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {AuthService} from "../../../services/auth.service";
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,    
    private dialogRef: MatDialogRef<SignInComponent>,   
    public authService: AuthService 
  ) { }

  ngOnInit(): void {
  }

}
