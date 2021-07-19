import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {WelcomeComponent} from '../../student/welcome/welcome.component';
import {AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference} from 'angularfire2/storage';
import {Observable} from "rxjs";
import * as constants from '../../../models/constants';
import {QuestionService} from "../../../services/question-service.service";
import {Questions} from "../../../models/questions";
import {UtilService} from "../../../services/util-service.service";
import {AuthService} from "../../../services/auth.service";
import {StudentService} from "../../../services/student-service.service";
import {Router} from "@angular/router";
import {ProgressDialogComponent} from "../progress-dialog/progress-dialog.component";
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  addQuestionForm!: FormGroup;
  status = 'open';
  date!: Date;
  // @ts-ignore
  task: AngularFireUploadTask;
  // @ts-ignore
  percentage: Observable<number>;
  // @ts-ignore
  snapshot: Observable<string>;
  // @ts-ignore
  taskRef: AngularFireStorageReference;
  // @ts-ignore
  downloadUrl: Observable<string>;
  uploadedFiles: string[] = [];
  askedQuestions = [];
  studentUniqueKey = '';
  files: File[] = [];
  subjectList: string[] = [];
  
  options: string[] = ['Maths', 'Science', 'English'];
  filteredOptions?: Observable<string[]>;
  questionId = '';


  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddQuestionComponent>,
    private storage: AngularFireStorage,
    private questionService: QuestionService,
    private utilService: UtilService,
    private authService: AuthService,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.questionId = this.utilService.generateUniqueKey(constants.genKey.question);
    this.subjectList = constants.subjects;
    this.addQuestionForm = this.formBuilder.group({
      questionTitle: ['', Validators.required],
      subject: ['', Validators.required],
      dueDateTime: [null, Validators.required],
      description: ['', Validators.required],
      files: []
    });
    this.date = new Date();
    this.filteredOptions = this.addQuestionForm.controls['subject'].valueChanges.pipe(
      startWith(''),
      map((value:string) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onDone() {
    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(
      (res) => {
        if (this.addQuestionForm.valid) {
          this.askQuestion(this.dialogRef, progressDialog);
        } else {
          progressDialog.close();
          alert("form invalid")
        }
      }
    )
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSelect(event: any) {
    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(() => {
      if (event.addedFiles.length < 2) {
        if (this.files.length + event.addedFiles.length > 2) {
          progressDialog.close();
          alert("you can upload upto 2 images");
        } else {
          this.files.push(event.addedFiles[0]);
          this.uploadFile(event.addedFiles[0], progressDialog);
        }
      } else {
        progressDialog.close();
        alert('please upload one by one');
      }
    })
  }

  onRemove(event: any) {
    const removeItem = this.files.indexOf(event);
    this.uploadedFiles.splice(removeItem, 1);
    this.files.splice(removeItem, 1);
  }

  askQuestion(dialogRef: MatDialogRef<any>, progressDialog: MatDialogRef<any>) {
    const questionLink = this.utilService.generateUniqueKey(constants.genKey.question);
    const question: Questions = {
      studentUniqueKey: this.studentUniqueKey,
      studentEmail: "",
      attachments: this.uploadedFiles,
      chatId: "",
      createdDate: new Date().getTime(),
      description: this.addQuestionForm.value.description,
      dueDate: this.addQuestionForm.value.dueDateTime,
      fee: 0,
      id: this.questionId,
      isPaid: false,
      isRefundRequested: false,
      questionSalt: "not required",
      questionTitle: this.addQuestionForm.value.questionTitle,
      status: constants.questionStatus.open,
      studentId: this.authService.student.userId,
      subjectCategory: this.addQuestionForm.value.subject,
      tutorId: "",
      uniqueId: this.questionId,
      uniqueLink: ""
    }
    this.questionService.saveQuestion(question, this.questionId).then((v) => {
      // @ts-ignore
      this.askedQuestions.push(this.questionId);
      dialogRef.close();
      progressDialog.close();
    });
  }

  uploadFile(file: File, progressDialog: MatDialogRef<any>) {
    const time = new Date().getTime();
    // @ts-ignore
    const path = constants.storage_collections.question + constants.url_sign.url_separator + this.questionId + constants.url_sign.url_separator + time + constants.url_sign.underscore + file.name;
    this.taskRef = this.storage.ref(path);
    this.task = this.taskRef.put(file);
    this.task.then(() => {
      this.taskRef.getDownloadURL().subscribe(
        (res) => {
          console.log("added")
          if (this.uploadedFiles.length === 0) {
            this.uploadedFiles.push(res);
          } else {
            this.uploadedFiles.forEach(link => {
              if (link !== res) {
                this.uploadedFiles.push(res);
              }
            })
          }
        }, () => {
          console.log("upload error");
        }, () => {
          progressDialog.close();
          console.log('completed')
          console.log(this.uploadedFiles);
        }
      )
    });
  }

}
