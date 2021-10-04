import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from 'angularfire2/storage';
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
import {WelcomeComponent} from "../../student/welcome/welcome.component";
import {StudentService} from "../../../services/student-service.service";
import {MailService} from "../../../services/mail.service";
import {ChatServiceService} from "../../../services/chat-service.service";
import {finalize, map, startWith, take} from "rxjs/operators";
import * as systemMessages from "../../../models/system-messages";
import {ChatMsg} from "../../../models/chat-msg";
import {Chat} from "../../../models/chat";
import {ValidationService} from "../../../services/validation.service";

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
  subjects = '';
  dueDateTime = '';
  description = ' ';
  subCategory = '';
  time: TimeApi = {status: "", time: 0};

  attachments: File[] = [];
  uploadingProgress = 0;


  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    // private welcomeRef: MatDialogRef<WelcomeComponent>,
    private storage: AngularFireStorage,
    private questionService: QuestionService,
    private utilService: UtilService,
    private authService: AuthService,
    private studentService: StudentService,
    public router: Router,
    private mailService: MailService,
    private chatService: ChatServiceService,
    private validationService: ValidationService,
    private location: Location,
  ) {
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

  onNavigateBack() {
    this.router.navigate([constants.routes.student_q_pool], {skipLocationChange: true});
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
              this.askQuestion(progressDialog, this.time.time, true);
            })
          } else {
            this.askEmail(progressDialog);
          }
        } else {
          progressDialog.close();
          this.router.navigate([constants.routes.student_q_pool], {skipLocationChange: true});
        }
      }
    )
  }


  onSelect(event: any) {
    this.uploadedSize = this.uploadedSize + event.addedFiles[0].size;
    if (this.uploadedSize <= constants.fileUploadLimit) {
      if (event.addedFiles.length < 2) {
        if (event.addedFiles.length > 2) {
          // alert("Please select one at a time");
          this.utilService.openDialog(systemMessages.questionTitles.uploadOneFileAtATime, systemMessages.questionMessages.uploadOneFileAtATime, constants.messageTypes.warningInfo).afterClosed().subscribe(
            (res) => {
              console.log(res);
            }
          )
        } else {
          this.files.push(event.addedFiles[0]);
          if (this.authService.isLoggedIn) {
            this.uploadFile(event.addedFiles[0]);
          } else {
            this.validationService.validateCors().subscribe((res) => {
              // @ts-ignore
              if (res && res.status === 200) {
                this.uploadFile(event.addedFiles[0]);
              }
            })
          }
        }
      } else {
        this.utilService.openDialog(systemMessages.questionTitles.uploadOneFileAtATime, systemMessages.questionMessages.uploadOneFileAtATime, constants.messageTypes.warningInfo).afterClosed().subscribe(
          (res) => {
            console.log(res);
          }
        )
      }
      // const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
      // progressDialog.afterOpened().subscribe(() => {
      //   if (event.addedFiles.length < 2) {
      //     if (event.addedFiles.length > 2) {
      //       progressDialog.close();
      //       // alert("Please select one at a time");
      //       this.utilService.openDialog(systemMessages.questionTitles.uploadOneFileAtATime, systemMessages.questionMessages.uploadOneFileAtATime, constants.messageTypes.warningInfo).afterClosed().subscribe(
      //         (res) => {
      //           console.log(res);
      //         }
      //       )
      //     } else {
      //       this.files.push(event.addedFiles[0]);
      //       if (this.authService.isLoggedIn) {
      //         this.uploadFile(event.addedFiles[0], progressDialog);
      //       } else {
      //         this.validationService.validateCors().subscribe((res) => {
      //           // @ts-ignore
      //           if (res && res.status === 200) {
      //             this.uploadFile(event.addedFiles[0], progressDialog);
      //           }
      //         })
      //       }
      //     }
      //   } else {
      //     progressDialog.close();
      //     this.utilService.openDialog(systemMessages.questionTitles.uploadOneFileAtATime, systemMessages.questionMessages.uploadOneFileAtATime, constants.messageTypes.warningInfo).afterClosed().subscribe(
      //       (res) => {
      //         console.log(res);
      //       }
      //     )
      //   }
      // })
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

  askQuestion(dialogRef: MatDialogRef<any>, time: number, isLoggedIn: boolean) {
    const question: Questions = {
      studentUnReadCount: 0, tutorUnReadCount: 0,
      studentUnReadMessages: false, tutorUnReadMessages: false,
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
    this.questionService.incrementQuestionNumber().then(() => {
      this.questionService.incrementQuestionCount().then(() => {
        this.questionService.findQuestionNumber().get().subscribe(
          (res) => {
            // @ts-ignore
            if (isLoggedIn) {
              // @ts-ignore
              this.questionService.saveQuestion(question, this.questionId, constants.uniqueIdPrefix.prefixQuestionNumber + res.data()['questionNumber']).then((v) => {
                // @ts-ignore
                this.askedQuestions.push(this.questionId);
                this.sendAknowledgementEmail(this.authService.student.email, this.utilService.generateChatLink(question.chatId, constants.userTypes.student));
                // @ts-ignore
                if (res.data().questionNumber) {
                  // @ts-ignore
                  this.createChat(this.questionId, this.authService.student.userId, question.questionTitle, constants.uniqueIdPrefix.prefixQuestionNumber + res.data()['questionNumber'], question.description);
                } else {
                  this.createChat(this.questionId, this.authService.student.userId, question.questionTitle, '', question.description);
                }
                dialogRef.close(true);
              });
            } else {
              // @ts-ignore
              question.questionNumber = res.data().questionNumber;
              this.questionService.saveNotLoggedQuestion(question).subscribe((response) => {
                console.log(res.data());
                // @ts-ignore
                if (response.staus === 200) {
                  this.sendAknowledgementEmail(this.authService.student.email, this.utilService.generateChatLink(question.chatId, constants.userTypes.student));
                  // @ts-ignore
                  if (res.data()['questionNumber']) {
                    // @ts-ignore
                    this.createChat(this.questionId, this.authService.student.userId, question.questionTitle, constants.uniqueIdPrefix.prefixQuestionNumber + res.data()['questionNumber'], question.description);
                  } else {
                    this.createChat(this.questionId, this.authService.student.userId, question.questionTitle, '', question.description);
                  }
                  dialogRef.close(true);
                } else {
                  alert("invalid domain")
                }
              })
            }
          }
        );
        this.utilService.openDialog(systemMessages.questionTitles.addQuestionSuccess, systemMessages.questionMessages.questionSavedSuccessfully, constants.messageTypes.success).afterOpened().subscribe()
      });
    })
  }

  uploadFile(file: File) {
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
    dialogConfig.width = "100%";
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
                    this.askQuestion(progressDialog, this.time.time, false);
                  })
                }
              }
            );
          }
        )
      }
    )
    progressDialog.close();
    this.router.navigate(["/"], {skipLocationChange: true});
  }

  sendAknowledgementEmail(email: string, link: string) {
    this.mailService.sendMail("You have submitted a new question", this.authService.student.email, constants.getStudentNewQuestion(link, this.authService.student.firstName), constants.mailTemplates.studentNewQuestion).subscribe();
  }

  createChat(chatId: string, studentId: string, questionTitle: string, questionNumber: string, questionDesc: string) {
    const chatLink = this.utilService.generateChatLink(chatId, constants.userTypes.student);
    const tutorChatLink = this.utilService.generateChatLink(chatId, constants.userTypes.tutor);
    const msgs: ChatMsg[] = []
    const data: Chat = {
      studentLastSeen: false, tutorLastSeen: false,
      studentName: this.authService.student.firstName,
      isPaid: false,
      questionDescription: questionDesc,
      questionNumber: "",
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


}
