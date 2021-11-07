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
import {ValidationService} from "../../../services/validation.service";
import {SignUpComponent} from "../../auth/sign-up/sign-up.component";
import {SignInComponent} from "../../auth/sign-in/sign-in.component";

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
  files: any[] = [];
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
  emails: string[] = [];

  uploadingProgress = 0;
  validations = systemMessages.validations;

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
    private validationService: ValidationService,
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.options.filter(option => option.toLowerCase().includes(filterValue)).length === 1) {
      this.selectedSubject = this.options.filter(option => option.toLowerCase().includes(filterValue))[0];
      if (this.selectedSubject === constants.subjectCodes.mathematics) {
        this.subOptions = constants.mathsSubjects;
      }
      if (this.selectedSubject === constants.subjectCodes.management) {
        this.subOptions = constants.managementSubjects;
      }
      if (this.selectedSubject === constants.subjectCodes.physics) {
        this.subOptions = constants.physicsSubjects;
      }
      if (this.selectedSubject === constants.subjectCodes.engineering) {
        this.subOptions = constants.engineeringSubjects;
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
            this.askQuestionNotLogged(progressDialog);
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


  askQuestion(dialogRef: MatDialogRef<any>, progressDialog: MatDialogRef<any>, time: number, isLoggedIn: boolean) {
    const question: Questions = {
      tutorEmail: "",
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
                this.sendAknowledgementEmail(this.authService.student.email, this.utilService.generateChatLink(question.chatId, constants.userTypes.student), question.questionNumber);
                // @ts-ignore
                if (res.data().questionNumber) {
                  // @ts-ignore
                  this.createChat(this.questionId, this.authService.student.userId, question.questionTitle, constants.uniqueIdPrefix.prefixQuestionNumber + res.data()['questionNumber'], question.description).then(() => {
                    this.router.navigate([constants.routes.student + constants.routes.chat, this.questionId]);
                  });
                } else {
                  this.createChat(this.questionId, this.authService.student.userId, question.questionTitle, '', question.description).then(() => {
                    this.router.navigate([constants.routes.student + constants.routes.chat, this.questionId]);
                  });
                }
                dialogRef.close(true);
                progressDialog.close();
              });
            } else {
              // @ts-ignore
              question.questionNumber = res.data().questionNumber;
              this.questionService.saveNotLoggedQuestion(question).subscribe((response) => {
                console.log(res.data());
                // @ts-ignore
                if (response.staus === 200) {
                  this.sendAknowledgementEmail(this.authService.student.email, this.utilService.generateChatLink(question.chatId, constants.userTypes.student), question.questionNumber);
                  // @ts-ignore
                  if (res.data()['questionNumber']) {
                    // @ts-ignore
                    this.createChat(this.questionId, this.authService.student.userId, question.questionTitle, constants.uniqueIdPrefix.prefixQuestionNumber + res.data()['questionNumber'], question.description);
                  } else {
                    this.createChat(this.questionId, this.authService.student.userId, question.questionTitle, '', question.description);
                  }
                  this.router.navigate([constants.routes.student_q_pool])
                  dialogRef.close(true);
                  progressDialog.close();
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
    const index = this.files.length - 1;
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
        this.files[index].progress = res;
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

  askQuestionNotLogged(progressDialog: MatDialogRef<any>) {
    progressDialog.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "433px";
    const dialogRef = this.dialog.open(SignInComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res !== undefined && !res) {
          const dialogRefx = this.dialog.open(SignUpComponent, dialogConfig);
          dialogRefx.afterClosed().subscribe(
            (response) => {
              if (response && response !== 'fail') {
                this.authService.isLoggedIn = true;
                this.onDone();
              }
              if (response === 'fail') {
              }
            }
          );
        }
        if (res && res !== 'fail') {
          this.authService.isLoggedIn = true;
          this.onDone();
        }
        if (res === 'fail') {
        }
      }
    )
  }

  sendAknowledgementEmail(email: string, link: string, questionNumber: string) {
    this.studentService.getAllTutors().subscribe(
      (res1) => {
        console.log(res1);
        // @ts-ignore
        res1.docs.forEach(doc => {
          this.emails.push(doc.data()['email']);
        })
      }
    );
    this.mailService.sendMail("You have submitted a new question", this.authService.student.email, constants.getStudentNewQuestion(link, this.authService.student.firstName), constants.mailTemplates.studentNewQuestion).subscribe(
      (res) => {
        // @ts-ignore
        if (res.status === 200) {
          this.mailService.sendMail("Request Submitted", this.emails, constants.getTutorNewQuestion(this.addQuestionForm.value.questionTitle, this.authService.student.firstName, questionNumber), constants.mailTemplates.tutorNewQuestion).subscribe()
        }
      }
    );
  }

  createChat(chatId: string, studentId: string, questionTitle: string, questionNumber: string, questionDesc: string) {
    const chatLink = this.utilService.generateChatLink(chatId, constants.userTypes.student);
    const tutorChatLink = this.utilService.generateChatLink(chatId, constants.userTypes.tutor);
    const msgs: ChatMsg[] = []
    const data: Chat = {
      studentOnline: false, tutorOnline: false,
      tutorEmail: "",
      studentLastSeen: false, tutorLastSeen: false,
      studentName: this.authService.student.firstName,
      isPaid: false,
      questionDescription: questionDesc,
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
    return this.chatService.createChat(chatId, data);
  }

  onAccept() {
    this.acceptQuestion();
    this.utilService.openDialog(systemMessages.questionTitles.addQuestionSuccess, systemMessages.questionMessages.acceptQuestionSuccess, constants.messageTypes.success).afterClosed().subscribe();
    // @ts-ignore
    this.router.navigate([constants.routes.turor + constants.routes.chat, this.data.id]);
  }

  acceptQuestion() {
    // @ts-ignore
    if (this.data.isTutor) {
      // @ts-ignore
      this.questionService.joinTutorForQuestion(this.data.id, this.authService.student.userId, this.data.studentEmail, this.dialogRef, this.authService.student.visibleName, this.authService.student.profileImage).then(() => {
        this.studentService.incrementRequestCount(this.authService.student.userId).then();
      });
      // @ts-ignore
      this.mailService.sendMail("Tutor Onboard", this.data.studentEmail, constants.getTutorJoinRequest(this.data.studentName, this.authService.student.visibleName), constants.mailTemplates.tutorJoin).subscribe()
      // @ts-ignore
      if (!this.data.byLoggedUser) {
        // @ts-ignore
        this.chatService.getChat(this.data.id).valueChanges().subscribe(
          (res) => {
            console.log(res);
            // @ts-ignore
            this.mailService.sendMail("Tutor Onboard", this.data.studentEmail, constants.getTutorJoinRequest(this.data.studentName, this.authService.student.visibleName), constants.mailTemplates.tutorJoin).subscribe()
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

  changeSubCategory() {
    // @ts-ignore
    this.addQuestionForm.get('subCategory').setValue('');
  }

//  new file uploader
  /**
   * on file drop handler
   */
  // @ts-ignore
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  // @ts-ignore
  fileBrowseHandler(files: React.ChangeEvent<HTMLInputElement>) {
    this.prepareFilesList(files.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.uploadedFiles.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFile(files[0]);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  // @ts-ignore
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}
