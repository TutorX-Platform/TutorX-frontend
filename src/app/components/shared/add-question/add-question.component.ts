import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { WelcomeComponent } from '../../student/welcome/welcome.component';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  addQuestionForm!: FormGroup;
  status='open';
  date!: Date;

  constructor(
    private formBuilder: FormBuilder,    
    private dialogRef: MatDialogRef<AddQuestionComponent>,
    private dialog: MatDialog    
  ) { }

  ngOnInit(): void {
    this.addQuestionForm = this.formBuilder.group({
      questionTitle: [null, Validators.required],
      subject: [null, Validators.required],
      dueDateTime: [null, Validators.required],
      description: [null, Validators.required],
      files: [null, Validators.required]
    });
    this.date = new Date();
  }

  onSubmit(){
    this.dialogRef.close();    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "433px";
    dialogConfig.height = "520px";
    this.dialog.open(WelcomeComponent, dialogConfig);
  }

  onCancel(){
    this.dialogRef.close();    
  }

  files: File[] = [];

	onSelect(event:any) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event:any) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}

}
