import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  loginForm!: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,    
    private dialogRef: MatDialogRef<AddQuestionComponent>,    
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      questionTitle: [null, Validators.required],
      subject: [null, Validators.required],
      dueDate: [null, Validators.required],
      tag: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  hello(){
    console.log("Hi");
  }

}
