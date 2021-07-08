import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class SignUpComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,    
    private dialogRef: MatDialogRef<SignUpComponent>,    
  ) { }

  ngOnInit(): void {
  }

}
