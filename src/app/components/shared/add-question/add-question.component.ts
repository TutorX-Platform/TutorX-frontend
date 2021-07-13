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


  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddQuestionComponent>,
    private storage: AngularFireStorage,
    private questionService: QuestionService,
    private utilService: UtilService,
    private authService: AuthService,
    public router: Router,
    private studentService: StudentService
  ) {
  }

  ngOnInit(): void {
    this.addQuestionForm = this.formBuilder.group({
      questionTitle: ['', Validators.required],
      subject: ['', Validators.required],
      dueDateTime: [null, Validators.required],
      description: ['', Validators.required],
      files: []
    });
    this.date = new Date();
    this.studentService.findStudentDetails().subscribe(
      (res) => {
        // @ts-ignore
        this.studentUniqueKey = res.uniqueKey;
        // @ts-ignore
        this.askedQuestions = res.questions;

      }
    );
  }

  onDone() {
    if (this.authService.userData) {
      if (this.addQuestionForm.valid) {
        this.startUpload(this.dialogRef);
      } else {
        console.log(this.addQuestionForm.value)
        alert("form invalid")
      }
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = "433px";
      dialogConfig.height = "520px";
      this.dialog.open(WelcomeComponent, dialogConfig);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);

  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  startUpload(dialogRef: MatDialogRef<any>) {
    if (this.files.length > 0) {
      const file = this.files[0];
      const time = new Date().getTime();
      // @ts-ignore
      const path = constants.storage_collections.question + '/' + time + '_' + file.name;
      this.taskRef = this.storage.ref(path);
      this.task = this.taskRef.put(file);
      this.task.then(() => {
        this.taskRef.getDownloadURL().subscribe(
          (res) => {
            this.uploadedFiles.push(res);
          }, () => {
            console.log("upload error");
          }, () => {
            this.askQuestion(dialogRef);
          }
        )
      });
    } else {
      this.askQuestion(dialogRef);
    }
  }


  askQuestion(dialogRef: MatDialogRef<any>) {
    const questionId = this.utilService.generateUniqueKey(constants.genKey.question);
    const questionLink = this.utilService.generateUniqueKey(constants.genKey.question);
    const question: Questions = {
      studentEmail: "",
      attachments: this.uploadedFiles,
      chatId: "",
      createdDate: new Date(),
      description: this.addQuestionForm.value.description,
      dueDate: this.addQuestionForm.value.dueDateTime,
      fee: 0,
      id: questionId,
      isPaid: false,
      isRefundRequested: false,
      questionSalt: "not required",
      questionTitle: this.addQuestionForm.value.questionTitle,
      status: constants.questionStatus.open,
      studentId: this.studentUniqueKey,
      subjectCategory: this.addQuestionForm.value.subject,
      tutorId: "",
      uniqueId: questionId,
      uniqueLink: ""
    }
    this.questionService.saveQuestion(question, questionId).then((v) => {
      // @ts-ignore
      this.askedQuestions.push(questionId);
      this.studentService.addQuestion(this.askedQuestions).then(
        () => {
          dialogRef.close();
          this.router.navigate([constants.routes.student_q_pool]);
        }
      );
    });
  }

}
