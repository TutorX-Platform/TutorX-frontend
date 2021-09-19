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
import {finalize, map, startWith, take} from 'rxjs/operators';
import {MailService} from "../../../services/mail.service";
import {ChatServiceService} from "../../../services/chat-service.service";
import {Chat} from "../../../models/chat";
import {ChatMsg} from "../../../models/chat-msg";
import {TimeApi} from "../../../models/time-api";
import * as systemMessages from '../../../models/system-messages';
import {StudentService} from "../../../services/student-service.service";
import {Attachment} from "../../../models/Attachment";

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
  uploadedFiles: Attachment[] = [];
  askedQuestions = [];
  studentUniqueKey = '';
  files: File[] = [];
  subjectList: string[] = [];
  // @ts-ignore
  uploadProgress: Observable<number>
  questionNumber: number = 0;

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
  subjects = '';
  dueDateTime = '';
  description = '';
  subCategory = '';
  time: TimeApi = {status: "", time: 0};

  attachments: Attachment[] = [];

  uploadingProgress = 0;


  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddQuestionComponent>,
    private welcomeRef: MatDialogRef<WelcomeComponent>,
    private storage: AngularFireStorage,
    private questionService: QuestionService,
    private utilService: UtilService,
    private authService: AuthService,
    private studentService: StudentService,
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
      description: [{value: '', disabled: this.isFormDisabled}],
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

    console.log(this.data, "daaaaaaaaaaaaaaata")
  }

  patchValues() {
    // @ts-ignore
    this.subjects = this.data.subjects;
    // @ts-ignore
    this.dueDateTime = this.data.dueDate.toDate();
    // @ts-ignore
    this.description = this.data.description;
    // @ts-ignore
    this.attachments = this.data.attachments;
    // @ts-ignore
    this.subCategory = this.data.subCategory;
  }

  patchValuesToForm() {
    // @ts-ignore
    this.questionId = this.data.id;
    // @ts-ignore
    this.attachments = this.data.attachments;
    this.attachments.forEach((attachment) => {
      let file = new File([attachment.fileName], attachment.fileName, {
        type: attachment.extension
      });
      this.files.push(file);
    })
    this.addQuestionForm.patchValue({
      // @ts-ignore
      questionTitle: this.data.title,
      // @ts-ignore
      subject: this._filter(this.data.subjects),
      // @ts-ignore
      subCategory: this._subfilter(this.data.subCategory),
      // @ts-ignore
      dueDateTime: this.data.dueDate.toDate(),
      // @ts-ignore
      description: this.data.description,
    })
  }

  onOpen(name: string) {

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
              this.askQuestion(this.dialogRef, progressDialog, this.time.time, true);
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


  askQuestion(dialogRef: MatDialogRef<any>, progressDialog: MatDialogRef<any>, time: number, isLoggedIn: boolean) {
    const question: Questions = {
      questionNumber: '',
      studentImage: this.authService.student.profileImage,
      byLoggedUser: isLoggedIn,
      isQuoteApproved: false,
      isQuoteSend: false,
      lastAssignedTutorImage: "",
      lastAssignedTutorName: "",
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
    this.questionService.incrementQuestionNumber();
    this.questionService.incrementQuestionCount();

    this.questionService.findQuestionNumber().valueChanges().pipe(take(2)).subscribe(
      (res) => {
        console.log(res);
        this.questionService.saveQuestion(question, this.questionId, constants.uniqueIdPrefix.prefixQuestionNumber + res.questionNumber).then((v) => {
          // @ts-ignore
          this.askedQuestions.push(this.questionId);
          this.sendAknowledgementEmail(this.authService.student.email);
          this.createChat(this.questionId, this.authService.student.userId, question.questionTitle, constants.uniqueIdPrefix.prefixQuestionNumber + res.questionNumber);
          dialogRef.close(true);
          progressDialog.close();
        });
      }
    );
    this.utilService.openDialog(systemMessages.questionTitles.addQuestionSuccess, systemMessages.questionMessages.questionSavedSuccessfully, constants.messageTypes.success).afterOpened().subscribe()


  }

  uploadFile(file: File, progressDialog: MatDialogRef<any>) {
    const time = new Date().getTime();
    // @ts-ignore
    const path = constants.storage_collections.question + constants.url_sign.url_separator + this.questionId + constants.url_sign.url_separator + time + constants.url_sign.underscore + file.name;
    this.taskRef = this.storage.ref(path);
    this.task = this.storage.upload(path, file);

    this.task.percentageChanges().subscribe(
      (res) => {
        console.log(res);
        // @ts-ignore
        this.uploadingProgress = res;
      }
    )

    // @ts-ignore
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(finalize(() => {
      this.taskRef.getDownloadURL().subscribe((url) => {
        let attachment: Attachment = {extension: file.type, downloadUrl: url, fileName: file.name}
        this.uploadedFiles.push(attachment);
        progressDialog.close();
      }, () => {
        this.utilService.openDialog(systemMessages.questionTitles.fileUploadError, systemMessages.questionMessages.fileUploadError, constants.messageTypes.warningInfo).afterOpened().subscribe(
          (res) => {
            console.log(res);
          }
        )
      })
    })).subscribe()
  }

  askEmail(progressDialog: MatDialogRef<any>) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    // dialogConfig.height = "810px";
    const dialogRef = this.dialog.open(WelcomeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (result) => {
        const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
        progressDialog.afterOpened().subscribe(
          () => {
            this.authService.student.firstName = result.value.name;
            this.authService.student.email = result.value.email;

            this.studentService.findStudentByEmail(this.authService.student.email).valueChanges().subscribe(
              (res) => {
                if (res.length > 0) {
                  progressDialog.close();
                  this.utilService.openDialog(systemMessages.questionTitles.notLoggedUserWithLoggedCredentials, systemMessages.questionMessages.notLoggedUserWithLoggedCredentials, constants.messageTypes.warning).afterOpened().subscribe();
                } else {
                  this.utilService.getTimeFromTimeAPI().subscribe((res) => {
                    // @ts-ignore
                    this.time = res;
                    this.askQuestion(this.dialogRef, progressDialog, this.time.time, false);
                    this.mailService.questionAddedEmailToNotLoggedUser(this.authService.student.email).subscribe();
                  })
                  this.sendAknowledgementEmail(this.authService.student.email);
                }
              }
            );
          }
        )
      }
    )
    progressDialog.close();
  }

  sendAknowledgementEmail(email: string) {
    this.mailService.sendQuestionAcknowledgementEmail(email).subscribe();
  }

  createChat(chatId: string, studentId: string, questionTitle: string, questionNumber: string) {
    const chatLink = this.utilService.generateChatLink(chatId, constants.userTypes.student);
    const tutorChatLink = this.utilService.generateChatLink(chatId, constants.userTypes.tutor);
    const msgs: ChatMsg[] = []
    const data: Chat = {
      questionNumber: questionNumber,
      questionTitle: questionTitle,
      studentProfile: this.authService.student.profileImage,
      tutorProfile: "",
      tutorChatLink: tutorChatLink,
      studentEmail: this.authService.student.email,
      attachments: [],
      createdDate: new Date(),
      studentChatLink: chatLink,
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
    this.acceptQuestion();
    this.utilService.openDialog(systemMessages.questionTitles.addQuestionSuccess, systemMessages.questionMessages.acceptQuestionSuccess, constants.messageTypes.success).afterClosed().subscribe();
    this.router.navigate([constants.routes.turor.concat(constants.routes.activities)], {skipLocationChange: true});
  }

  acceptQuestion() {
    // @ts-ignore
    if (this.data.isTutor) {
      // @ts-ignore
      this.questionService.joinTutorForQuestion(this.data.id, this.authService.student.userId, this.data.studentEmail, this.dialogRef, this.authService.student.firstName, this.authService.student.profileImage);
      // @ts-ignore
      if (!this.data.byLoggedUser) {
        // @ts-ignore
        this.chatService.getChat(this.data.id).valueChanges().subscribe(
          (res) => {
            console.log(res);
            // @ts-ignore
            this.mailService.tutorJoinedFor(this.data.studentEmail, res.studentChatLink).subscribe()
          }
        )
      }
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
