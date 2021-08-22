import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {WelcomeComponent} from '../../student/welcome/welcome.component';
import {AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference} from 'angularfire2/storage';
import {Observable} from "rxjs";
import * as constants from '../../../models/constants';
import {QuestionService} from "../../../services/question-service.service";
import {Questions} from "../../../models/questions";
import {UtilService} from "../../../services/util-service.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {ProgressDialogComponent} from "../progress-dialog/progress-dialog.component";
import {map, startWith} from 'rxjs/operators';
import {MailService} from "../../../services/mail.service";
import {ChatServiceService} from "../../../services/chat-service.service";
import {Chat} from "../../../models/chat";
import {ChatMsg} from "../../../models/chat-msg";
import {TimeApi} from "../../../models/time-api";
import construct = Reflect.construct;
import {MessageDialogComponent} from "../message-dialog/message-dialog.component";
import * as systemMessages from '../../../models/system-messages';

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
  subOptions: string[] = [];
  selectedSubject: string = '';
  subCategoryList: string[] = [];
  filteredOptions?: Observable<string[]>;
  filteredSubOptions?: Observable<string[]>;
  questionId = '';
  uploadedSize: number = 0;
  data = null;
  role = '';
  questionTitle = '';
  isFormDisabled = false;

  subject = '';
  dueDateTime = '';
  description = '';
  time: TimeApi = {status: "", time: 0};


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
    private chatService: ChatServiceService,
    // @ts-ignore
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if (data !== null) {
      this.data = data;
      // this.isFormDisabled = true;
    }
  }

  ngOnInit(): void {
    this.questionId = this.utilService.generateUniqueKey(constants.genKey.question);
    this.subjectList = constants.subjects;
    this.addQuestionForm = this.formBuilder.group({
      questionTitle: [{value: '', disabled: this.isFormDisabled}, Validators.required],
      subject: [{value: '', disabled: this.isFormDisabled}, Validators.required],
      subCategory: [{value: '', disabled: this.isFormDisabled}, Validators.required],
      dueDateTime: [{value: null, disabled: this.isFormDisabled}, Validators.required],
      description: [{value: '', disabled: this.isFormDisabled}, Validators.required],
      files: []
    });
    this.date = new Date();
    this.filteredOptions = this.addQuestionForm.controls['subject'].valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value))
    );

    this.filteredSubOptions = this.addQuestionForm.controls['subCategory'].valueChanges.pipe(
      startWith(''),
      map((value: string) => this._subfilter(value))
    );


    if (this.data !== null) {
      // @ts-ignore
      this.role = this.data.role;
      // @ts-ignore
      this.questionTitle = this.data.title;
      // @ts-ignore
      this.status = this.data.status;
      if (this.role === 'tutor') {
        this.patchValues()
      } else {
        this.patchValuesToForm();
      }
    }
  }

  patchValues() {
    // @ts-ignore
    this.subject = this.data.subjects[0];
    // @ts-ignore
    this.dueDateTime = this.data.dueDate.toDate();
    // @ts-ignore
    this.description = this.data.description;

  }

  patchValuesToForm() {
    // @ts-ignore
    this.questionId = this.data.id;
    // @ts-ignore
    // this.files.push(this.data.images);
    this.addQuestionForm.patchValue({
      // @ts-ignore
      questionTitle: this.data.title,
      // @ts-ignore
      subject: this._filter(this.data.subjects[0]),
      // @ts-ignore
      dueDateTime: this.data.dueDate,
      // @ts-ignore
      description: this.data.description
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.options.filter(option => option.toLowerCase().includes(filterValue)).length === 1) {
      this.selectedSubject = this.options.filter(option => option.toLowerCase().includes(filterValue))[0];
      if (this.selectedSubject === constants.subjectCodes.mathematics) {
        this.subOptions.push(...constants.mathsSubjects)
      }
      if (this.selectedSubject === constants.subjectCodes.management) {
        this.subOptions = constants.managementSubjects;
      }
      if (this.selectedSubject === constants.subjectCodes.physics) {
        this.subOptions = constants.physicsSubjects;
      }
      if (this.selectedSubject === constants.subjectCodes.computer_science) {
        this.subOptions = constants.csSubjects;
        console.log(this.subOptions);
      }
    }
    console.log(this.subOptions);
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _subfilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(this.subOptions);
    console.log(this.subOptions.filter(option => option.toLowerCase().includes(filterValue)));
    return this.subOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  onDone() {
    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(
      (res) => {
        if (this.addQuestionForm.valid) {
          if (this.authService.isLoggedIn) {
            this.utilService.getTimeFromTimeAPI().subscribe((res) => {
              // @ts-ignore
              this.time = res;
              this.askQuestion(this.dialogRef, progressDialog, this.time.time);
            })
          } else {
            this.askEmail(progressDialog);
          }
        } else {
          progressDialog.close();
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
            // alert("Please select one at a time");
            this.utilService.openDialog(systemMessages.questionTitles.uploadOneFileAtATime, systemMessages.questionMessages.uploadOneFileAtATime, constants.messageTypes.warningInfo).afterClosed().subscribe(
              (res) => {
                console.log(res);
              }
            )
          } else {
            this.files.push(event.addedFiles[0]);
            this.uploadFile(event.addedFiles[0], progressDialog);
          }
        } else {
          progressDialog.close();
          this.utilService.openDialog(systemMessages.questionTitles.uploadOneFileAtATime, systemMessages.questionMessages.uploadOneFileAtATime, constants.messageTypes.warningInfo).afterClosed().subscribe(
            (res) => {
              console.log(res);
            }
          )
        }
      })
    } else {
      this.utilService.openDialog(systemMessages.questionTitles.uploadLimitExceedError, systemMessages.questionMessages.uploadLimitExceedError, constants.messageTypes.warning).afterClosed().subscribe(
        (res) => {
          console.log(res);
        }
      )
    }
  }

  onRemove(event: any) {
    const removeItem = this.files.indexOf(event);
    this.uploadedFiles.splice(removeItem, 1);
    this.files.splice(removeItem, 1);
  }

  askQuestion(dialogRef: MatDialogRef<any>, progressDialog: MatDialogRef<any>, time: number) {
    const question: Questions = {
      sort: this.time.time,
      subCategory: this.addQuestionForm.value.subCategory,
      tutorImage: "",
      tutorName: "",
      studentName: this.authService.student.firstName,
      studentUniqueKey: this.studentUniqueKey,
      studentEmail: this.authService.student.email,
      attachments: this.uploadedFiles,
      chatId: this.questionId,
      createdDate: time,
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
      this.utilService.openDialog(systemMessages.questionTitles.addQuestionSuccess, systemMessages.questionMessages.questionSavedSuccessfully, constants.messageTypes.success).afterOpened().subscribe(
        (option) => {
          console.log(option);
        }
      )
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
          this.utilService.openDialog(systemMessages.questionTitles.fileUploadError, systemMessages.questionMessages.fileUploadError, constants.messageTypes.warningInfo).afterOpened().subscribe(
            (res) => {
              console.log(res);
            }
          )
        }, () => {
          progressDialog.close();
          this.utilService.openDialog(systemMessages.questionTitles.fileUploadSuccess, systemMessages.questionMessages.questionSavedSuccessfully, constants.messageTypes.success).afterOpened().subscribe(
            (res) => {
              console.log(res);
            }
          )
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
        this.utilService.getTimeFromTimeAPI().subscribe((res) => {

        })
        this.utilService.getTimeFromTimeAPI().subscribe((res) => {
          // @ts-ignore
          this.time = res;
          this.askQuestion(this.dialogRef, progressDialog, this.time.time);
        })
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
      attachments: [],
      createdDate: new Date(),
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

  onAccept() {
    this.utilService.openDialog(systemMessages.questionTitles.acceptChatConfirmation, systemMessages.questionMessages.acceptChatConfirmation, constants.messageTypes.confirmation).afterClosed().subscribe(
      (res) => {
        if (res === true) {
          this.acceptQuestion();
          this.utilService.openDialog(systemMessages.questionTitles.addQuestionSuccess, systemMessages.questionMessages.acceptQuestionSuccess, constants.messageTypes.success).afterClosed().subscribe();
        }
      }
    )
  }

  acceptQuestion() {
    // @ts-ignore
    if (this.data.isTutor) {
      // @ts-ignore
      this.questionService.joinTutorForQuestion(this.data.id, this.authService.student.userId, this.data.studentEmail, this.dialogRef, this.authService.student.firstName, this.authService.student.profileImage);
    } else {
      alert('you are not a tutor');
    }
  }

  onDeleteQuestion() {
    // @ts-ignore
    console.log(this.data.status);
    // @ts-ignore
    if (this.data.status === constants.questionStatus.open) {
      this.utilService.openDialog(systemMessages.questionMessages.deleteConfirmation, systemMessages.questionMessages.deleteConfirmation, constants.messageTypes.confirmation).afterClosed().subscribe(
        (res) => {
          if (res === true) {
            this.dialogRef.close();
            this.questionService.deleteQuestionByStudent(this.questionId);
          }
        }
      )
    } else {
      this.utilService.openDialog(systemMessages.questionTitles.deleteFail, systemMessages.questionMessages.deleteFail, constants.messageTypes.warning).afterClosed().subscribe(
        (res) => {
          if (res === true) {
            this.dialogRef.close();
          }
        }
      )
    }
  }

}
