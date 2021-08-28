import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AngularFireStorage} from 'angularfire2/storage';
import {Questions} from 'src/app/models/questions';
import {AuthService} from 'src/app/services/auth.service';
import {QuestionService} from 'src/app/services/question-service.service';
import {UtilService} from 'src/app/services/util-service.service';
import * as constants from '../../../models/constants';
import {ProgressDialogComponent} from '../progress-dialog/progress-dialog.component';
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {TimeApi} from "../../../models/time-api";
import {Attachment} from "../../../models/Attachment";

@Component({
  selector: 'app-add-question-mobile',
  templateUrl: './add-question-mobile.component.html',
  styleUrls: ['./add-question-mobile.component.scss']
})
export class AddQuestionMobileComponent implements OnInit {

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
  uploadedFiles: Attachment[] = [];
  askedQuestions = [];
  studentUniqueKey = '';
  files: File[] = [];
  // @ts-ignore
  time: TimeApi;

  subjectList: string[] = [];
  options: string[] = ['Maths', 'Science', 'English'];

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private questionService: QuestionService,
    private utilService: UtilService,
    private authService: AuthService,
    public router: Router,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.subjectList = constants.subjects;
    this.addQuestionForm = this.formBuilder.group({
      questionTitle: ['', Validators.required],
      subject: ['', Validators.required],
      dueDateTime: [null, Validators.required],
      description: ['', Validators.required],
      files: []
    });
    this.date = new Date();
  }

  onDone() {
    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());

    progressDialog.afterOpened().subscribe(
      (res) => {
        if (this.authService.userData) {
          if (this.addQuestionForm.valid) {
            // this.startUpload(this.dialogRef, progressDialog);
          } else {
            console.log(this.addQuestionForm.value)
            alert("form invalid")
          }
        }
      }
    )
  }

  onNavigateBack() {
    this.location.back();
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);

  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  startUpload(dialogRef: MatDialogRef<any>, progressDialog: MatDialogRef<any>) {
    if (this.files.length > 0) {
      const file = this.files[0];
      const time = new Date().getTime();
      // @ts-ignore
      const path = constants.storage_collections.question + '/' + time + '_' + file.name;
      this.taskRef = this.storage.ref(path);
      this.task = this.taskRef.put(file);
      this.task.then(() => {
        this.taskRef.getDownloadURL().subscribe(
          (res: any) => {
            let attachment: Attachment = {downloadUrl: res, fileName: file.name}
            this.uploadedFiles.push(attachment);
          }, () => {
            console.log("upload error");
          }, () => {
            this.askQuestion(dialogRef, progressDialog);
          }
        )
      });
    } else {
      this.askQuestion(dialogRef, progressDialog);
    }
  }


  askQuestion(dialogRef: MatDialogRef<any>, progressDialog: MatDialogRef<any>) {
    this.utilService.getTimeFromTimeAPI().subscribe((res) => {
      // @ts-ignore
      this.time = res;
      const questionId = this.utilService.generateUniqueKey(constants.genKey.question);
      const questionLink = this.utilService.generateUniqueKey(constants.genKey.question);
      const question: Questions = {
        byLoggedUser: false,
        isQuoteApproved: false,
        isQuoteSend: false,
        lastAssignedTutorImage: "",
        lastAssignedTutorName: "",
        sort: this.time.time,
        subCategory: this.addQuestionForm.value.subCategory,
        tutorImage: '',
        tutorName: '',
        studentName: "",
        studentUniqueKey: this.studentUniqueKey,
        studentEmail: "",
        attachments: this.uploadedFiles,
        chatId: "",
        createdDate: this.time.time,
        description: this.addQuestionForm.value.description,
        dueDate: this.addQuestionForm.value.dueDateTime,
        fee: 0,
        id: questionId,
        isPaid: false,
        isRefundRequested: false,
        questionSalt: "not required",
        questionTitle: this.addQuestionForm.value.questionTitle,
        status: constants.questionStatus.open,
        studentId: this.authService.student.userId,
        subjectCategory: this.addQuestionForm.value.subject,
        tutorId: "",
        uniqueId: questionId,
        uniqueLink: ""
      }
      this.questionService.saveQuestion(question, questionId).then((v) => {
        // @ts-ignore
        this.askedQuestions.push(questionId);
        dialogRef.close();
        progressDialog.close();
      });
    });
  }

}
