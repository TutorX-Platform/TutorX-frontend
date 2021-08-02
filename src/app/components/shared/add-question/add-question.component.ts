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
import {map, startWith} from 'rxjs/operators';
import {parseTemplate} from "@angular/compiler";
import {MailService} from "../../../services/mail.service";
import {ChatServiceService} from "../../../services/chat-service.service";
import {Chat} from "../../../models/chat";
import {ChatMsg} from "../../../models/chat-msg";

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

  options = constants.subjects;
  filteredOptions?: Observable<string[]>;
  questionId = '';
  uploadedSize: number = 0;


  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddQuestionComponent>,
    private welcomeRef: MatDialogRef<WelcomeComponent>,
    private storage: AngularFireStorage,
    private questionService: QuestionService,
    private utilService: UtilService,
    private authService: AuthService,
    public router: Router,
    private mailService: MailService,
    private chatService: ChatServiceService
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
      map((value: string) => this._filter(value))
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
          if (this.authService.isLoggedIn) {
            this.askQuestion(this.dialogRef, progressDialog);
          } else {
            this.askEmail(progressDialog);
          }
        } else {
          progressDialog.close();
          alert("form invalid")
        }
      }
    )
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onSelect(event: any) {
    this.uploadedSize = this.uploadedSize + event.addedFiles[0].size;
    if (this.uploadedSize <= constants.fileUploadLimit) {
      const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
      progressDialog.afterOpened().subscribe(() => {
        if (event.addedFiles.length < 2) {
          if (event.addedFiles.length > 2) {
            progressDialog.close();
            alert("Please select one at a time");
          } else {
            this.files.push(event.addedFiles[0]);
            this.uploadFile(event.addedFiles[0], progressDialog);
          }
        } else {
          progressDialog.close();
          alert('please upload one by one');
        }
      })
    } else {
      alert("You can upload upto 30MB !!");
    }
  }

  onRemove(event: any) {
    const removeItem = this.files.indexOf(event);
    this.uploadedFiles.splice(removeItem, 1);
    this.files.splice(removeItem, 1);
  }

  askQuestion(dialogRef: MatDialogRef<any>, progressDialog: MatDialogRef<any>) {
    const question: Questions = {
      studentName: this.authService.student.firstName,
      studentUniqueKey: this.studentUniqueKey,
      studentEmail: this.authService.student.email,
      attachments: this.uploadedFiles,
      chatId: this.questionId,
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
      this.sendAknowledgementEmail(this.authService.student.email);
      this.createChat(this.questionId, this.authService.student.userId);
      dialogRef.close(true);
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
          this.uploadedFiles.push(res);
        }, () => {
          console.log("upload error");
        }, () => {
          progressDialog.close();
          console.log(this.uploadedFiles);
        }
      )
    });
  }

  askEmail(progressDialog: MatDialogRef<any>) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    // dialogConfig.height = "810px";
    const dialogRef = this.dialog.open(WelcomeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (result) => {
        this.authService.student.firstName = result.value.name;
        this.authService.student.email = result.value.email;
      }, () => {
      }, () => {
        this.askQuestion(this.dialogRef, progressDialog);
        this.sendAknowledgementEmail(this.authService.student.email);
        this.authService.student.firstName = '';
        this.authService.student.email = '';
      }
    )
    progressDialog.close();

  }

  sendAknowledgementEmail(email: string) {
    this.mailService.sendQuestionAcknowledgementEmail(email).subscribe();
  }

  createChat(chatId: string, studentId: string) {
    const chatLink = this.utilService.generateChatLink(chatId);
    const msgs: ChatMsg[] = []
    const data: Chat = {
      chatLink: chatLink,
      tutorJoinedTime: new Date(),
      chatStatus: constants.chat_status.openForTutors,
      id: chatId,
      messagesId: chatId,
      tutorId: "",
      uniqueId: chatId,
      studentId: studentId,
      tutorsCount: 0
    }
    this.chatService.createChat(chatId, data);
  }

}
