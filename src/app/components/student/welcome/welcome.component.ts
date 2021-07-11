import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,    
    private dialogRef: MatDialogRef<WelcomeComponent>,   
    public authService: AuthService 
    ) { }

  ngOnInit(): void {
  }

}
