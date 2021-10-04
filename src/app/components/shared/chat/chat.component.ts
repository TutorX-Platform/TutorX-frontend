import {AfterViewChecked, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatServiceService} from "../../../services/chat-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Chat} from "../../../models/chat";
import {ProgressDialogComponent} from "../progress-dialog/progress-dialog.component";
import * as constants from "../../../models/constants";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {ChatMsg} from "../../../models/chat-msg";
import {AuthService} from "../../../services/auth.service";
import {ClipboardService} from "ngx-clipboard";
import {DatePipe, Location} from "@angular/common";
import {QuestionService} from "../../../services/question-service.service";
import {StudentService} from "../../../services/student-service.service";
import {UtilService} from "../../../services/util-service.service";
import {TimeApi} from "../../../models/time-api";
import {Questions} from "../../../models/questions";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "angularfire2/storage";
import {CardDetailsComponent} from "../payment-gateway/card-details/card-details.component";
import * as systemMessages from '../../../models/system-messages'
import {MailService} from "../../../services/mail.service";
import {Attachment} from "../../../models/Attachment";
import {PaymentService} from "../../../services/payment.service";
import {NotificationService} from "../../../services/notification.service";
import * as notificationMsg from '../../../models/notification-messages';
import {SignUpComponent} from "../../auth/sign-up/sign-up.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  // @ts-ignore
  // @ViewChild('scrollMe') private myScroll: ElementRef;
  message = new FormControl(null);
  quote = new FormControl('');
  isSendButtonDissabled = true;
  messages: any = [];
  chatToken: string = '';
  // @ts-ignore
  taskRef: AngularFireStorageReference;
  // @ts-ignore
  task: AngularFireUploadTask;
  attachments: Attachment[] = [];
  isFocused = false;
  cancelledQustion = false
  chat: Chat = {
    studentLastSeen: false,
    tutorLastSeen: false,
    studentName: "",
    isPaid: false,
    questionDescription: "",
    questionNumber: "",
    questionTitle: "",
    studentProfile: "",
    tutorProfile: "",
    tutorChatLink: "",
    studentEmail: "",
    attachments: [],
    createdDate: new Date(),
    studentChatLink: "",
    chatStatus: "",
    id: "",
    messagesId: "",
    studentId: "",
    tutorId: "",
    tutorJoinedTime: new Date(),
    tutorsCount: 0,
    uniqueId: ""
  };
  questionCreatedDate: number = 0;
  chatMessages: ChatMsg[] = [];
  // @ts-ignore
  question: Questions;

  isTutor = false;
  deadLine = new Date();
  // @ts-ignore
  dueDateTime: Date;
  dueDateTimeControll = new FormControl('');
  time: TimeApi = {status: "", time: 0};

  dummyProfPic = constants.dummy_profile_picture;
  isDetailedView = false;
  selectedPage = 1;
  fileToUpload: File | null = null;
  uploadReady = false;
  enableChangeQuote = false;

  isSendQuoteDissabled = true;
  attachementPicked = false;
  isNotLoggedUser = false;
  notLoggedUserEmail = 'sandunsameera25@gmail.com';

  test = new Date('Sep 01 2021 00:00:00');
  isTyping = false;
  sentMessageCount = 0;

  constructor(private chatService: ChatServiceService,
              private utilService: UtilService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              public authService: AuthService,
              private storage: AngularFireStorage,
              private clipboardApi: ClipboardService,
              public questionService: QuestionService,
              public router: Router,
              private dialog: MatDialog,
              private location: Location,
              private mailService: MailService,
              private paymentService: PaymentService,
              private notificationService: NotificationService,
              private datePipe: DatePipe,
              private studentService: StudentService) {
  }


  ngOnInit(): void {

    this.sentMessageCount = 0;
    this.activatedRoute.paramMap.subscribe(
      map => {
        // @ts-ignore
        this.chatToken = map.get('id');
        if (map.get('email')) {
          this.isNotLoggedUser = true;
          // @ts-ignore
          this.notLoggedUserEmail = map.get('email');
        }
      }
    );
    this.getChatDetails();
    this.getTypingStatus();
    if (this.studentService.currentStudent.role === constants.userTypes.tutor) {
      this.isTutor = true;
    }
    // this.scrollToBottom();
  }

  ngOnDestroy() {
    this.utilService.getTimeFromTimeAPI().subscribe(
      (res) => {
        if (this.authService.student.role === constants.userTypes.student) {
          const data = {
            // @ts-ignore
            studentLastSeen: res.time,
          }
          this.chatService.chatSeenUpdate(this.chatToken, data);

          const read = {
            studentUnReadMessages: false,
            tutorUnReadCount: this.sentMessageCount,
          }
          this.questionService.chatSeenUpdate(this.chatToken, read);
        }

        if (this.authService.student.role === constants.userTypes.tutor) {
          const data = {
            // @ts-ignore
            tutorLastSeen: res.time,
          }
          this.chatService.chatSeenUpdate(this.chatToken, data);

          const read = {
            tutorUnReadMessages: false,
            studentUnReadCount: this.sentMessageCount
          }
          this.questionService.chatSeenUpdate(this.chatToken, read);
        }
      }
    )
    console.log(this.sentMessageCount);
    this.sentMessageCount = 0;
  }

  // @ts-ignore
  triggerFunction(event) {
    console.log(event);
    if (!event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      if (this.message.value !== null) {
        this.onSend();
      }
      return true;
    }
  }

  onSend() {
    this.utilService.getTimeFromTimeAPI().subscribe((res) => {
      // @ts-ignore
      this.time = res;
      if (!this.attachementPicked) {
        // @ts-ignore
        this.chatService.sendMessage(this.chatToken, this.message.value, this.time.time, false, '', '');
        this.onUnAuthorizedMessageSent(this.message.value);
        this.sentMessageCount = this.sentMessageCount + 1;
      } else {
        this.uploadAttachment();
      }
      this.message.reset();
      this.isSendButtonDissabled = true;
    });

    let id = '';
    if (this.authService.student.role === constants.userTypes.student) {
      id = this.question.tutorId;
      const data = {
        tutorUnReadMessages: true,
        studentUnReadMessages: false
      }
      this.questionService.chatSeenUpdate(this.chatToken, data);
    }
    if (this.authService.student.role === constants.userTypes.tutor) {
      id = this.question.studentId;
      const data = {
        studentUnReadMessages: true,
        tutorUnReadMessages: false,
      }
      this.questionService.chatSeenUpdate(this.chatToken, data);
    }

    if (id !== '') {
      this.notificationService.getNotificationToken(id).valueChanges().subscribe(
        (res) => {
          console.log(res);
          if (res !== undefined && res) {
            this.notificationService.sendNotification(notificationMsg.notification_titles.new_message, notificationMsg.notification_messages.new_message, res.token, id).subscribe();
          }
        }
      )
    }


  }

  // scrollToBottom(): void {
  //   try {
  //     this.myScroll.nativeElement.scrollTop = this.myScroll.nativeElement.scrollHeight;
  //   } catch (err) {
  //   }
  // }

  getChatDetails() {
    const progressDailog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDailog.afterOpened().subscribe(
      (res) => {
        this.chatService.getChat(this.chatToken).valueChanges().subscribe(
          (res) => {
            // @ts-ignore
            this.chat = res;
            this.attachments = [];
            this.attachments.push(...this.chat.attachments);
            this.getMessages(progressDailog);
            this.getQuestion(this.chatToken);
          }, () => {
            progressDailog.close();
          }
        )
      }
    )
    // progressDailog.close()
  }

  getTypingStatus() {
    this.chatService.getTypingStatus(this.chatToken).valueChanges().subscribe(
      (res) => {
        console.log(res);
        // @ts-ignore
        this.isTyping = res.isTyping;
      }
    )
  }

  getMessages(progressDialog: MatDialogRef<any>) {
    // @ts-ignore
    this.chatService.getChat(this.chatToken).valueChanges().subscribe(
      (res) => {
        console.log(res);
        // @ts-ignore
        this.chat = res;
        // @ts-ignore
        console.log(res.createdDate['seconds']);
        // @ts-ignore
        this.questionCreatedDate = res.createdDate['seconds'];
        if (this.chat.tutorId === this.authService.student.userId || this.chat.studentId === this.authService.student.userId || this.chat.studentEmail === this.notLoggedUserEmail) {
          this.chatService.getMessages(this.chatToken).valueChanges().subscribe(
            res => {
              // @ts-ignore
              this.chatMessages = res;
              progressDialog.close();
            }, () => {
              progressDialog.close();
            }
          );
        } else {
          progressDialog.close();
          // alert("you dont have permissions to view this chat");
          // this.router.navigate([constants.routes.home])
        }
      }, () => {
        progressDialog.close();
      }
    )
  }

  onCopyLink() {
    this.utilService.openDialog(systemMessages.questionTitles.chatLinkCopy, systemMessages.questionMessages.chatLinkCopy, constants.messageTypes.success).afterOpened().subscribe(
      (res) => {
        if (this.isTutor) {
          this.clipboardApi.copyFromContent(this.chat.tutorChatLink);
        } else {
          this.clipboardApi.copyFromContent(this.chat.studentChatLink);
        }
      }
    )
  }


  onPay() {
    const dialogConfig = new MatDialogConfig();
    if (this.authService.isLoggedIn) {
      dialogConfig.autoFocus = true;
      dialogConfig.width = "70%";
      dialogConfig.data = this.chatToken;
      // dialogConfig.height = "650px";
      this.dialog.open(CardDetailsComponent, dialogConfig);

      this.dialog.afterAllClosed.subscribe(
        (res) => {
          console.log(res);
        }
      )
    } else {
      this.utilService.openDialog(systemMessages.questionTitles.signupInfo, systemMessages.questionMessages.signupInfo, constants.messageTypes.confirmation).afterClosed().subscribe(
        (res) => {
          if (res) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.autoFocus = true;
            dialogConfig.width = "433px";
            // dialogConfig.height = "950px";
            this.dialog.open(SignUpComponent, dialogConfig);
          }
        }
      )
    }
  }

  getQuestion(id: string) {
    this.questionService.getQuestionById(id).valueChanges().subscribe(
      (res) => {
        // @ts-ignore
        this.questionService.question = res;
        // @ts-ignore
        this.question = res;
        this.attachments.push(...this.question.attachments);
        // @ts-ignore
        this.dueDateTimeControll.value = this.questionService.question.dueDate.toDate();
        // @ts-ignore
        this.deadLine = this.questionService.question.dueDate.toDate();

        if (this.question.status === constants.questionStatus.open && this.authService.student.role === constants.userTypes.tutor) {
          //  route back the tutor..
        }
      }
    )
  }

  onNavigateBack() {
    if (this.isTutor) {
      // @ts-ignore
      this.router.navigate([constants.routes.turor.concat(constants.routes.activities)], {skipLocationChange: true});
    } else {
      this.router.navigate([constants.routes.student_q_pool], {skipLocationChange: true});
    }
  }

  onType() {
    if (this.message.value !== '') {
      this.isSendButtonDissabled = false;
    } else {
      this.isSendButtonDissabled = true;
    }
  }

  onTypeQuote() {
    if (this.quote.value !== null) {
      this.isSendQuoteDissabled = false;
    } else {
      this.isSendQuoteDissabled = true;
    }
  }

  onDetailedView(bool: boolean) {
    this.isDetailedView = bool;
  }

  onShowDetails(num: number) {
    this.selectedPage = num;
  }

  handleFileInput(event: any) {
    console.log(event.target.files[0]);
    if (event.target.files.length > 0) {
      this.uploadReady = true;
    }
    this.fileToUpload = event.target.files[0];
    this.message.setValue(this.fileToUpload?.name);
    this.attachementPicked = true;
    this.isSendButtonDissabled = false;
  }

  onReleaseQuestion() {
    this.utilService.openDialog(systemMessages.questionTitles.tutorReleaseQuestionConfirmation, systemMessages.questionMessages.tutorReleaseQuestionConfirmation, constants.messageTypes.confirmation).afterClosed().subscribe(
      (res) => {
        // @ts-ignore
        if (res) {
          if (this.questionService.question.status === constants.questionStatus.open || this.questionService.question.status === constants.questionStatus.assigned) {
            const data = {
              tutorName: "",
              tutorImage: null,
              tutorId: "",
              status: constants.questionStatus.open,
            }
            this.utilService.getTimeFromTimeAPI().subscribe((res) => {
              // @ts-ignore
              this.time = res;
              this.chatService.tutorLeftChat(this.chatToken, this.time.time);
              this.questionService.releaseQuestionByTutor(this.chatToken, data).then(() => {
                this.router.navigate([constants.routes.turor + constants.routes.questions], {skipLocationChange: true})
              });
            });
          } else {
            this.utilService.openDialog(systemMessages.questionTitles.tutorReleaseQuestionError, systemMessages.questionMessages.tutorReleaseQuestionError, constants.messageTypes.warningInfo).afterOpened().subscribe()
          }
        }
      }
    )
  }

  onRequestNewTutor() {
    this.utilService.openDialog(systemMessages.questionTitles.tutorReleaseQuestionConfirmation, systemMessages.questionMessages.tutorReleaseQuestionConfirmation, constants.messageTypes.confirmation).afterClosed().subscribe(
      (res) => {
        if (res) {
          if (this.questionService.question.status === constants.questionStatus.assigned) {
            const data = {
              tutorName: "",
              tutorImage: null,
              tutorId: "",
              status: constants.questionStatus.open,
            }
            this.utilService.getTimeFromTimeAPI().subscribe((res) => {
              // @ts-ignore
              this.time = res;
              this.chatService.requestedNewTutor(this.chatToken, this.time.time);
              this.questionService.releaseQuestionByTutor(this.chatToken, data);
            })
          } else if (this.questionService.question.status === constants.questionStatus.assigned) {
            this.utilService.openDialog(systemMessages.questionTitles.requestNewTutorError, systemMessages.questionMessages.requestNewTutorError, constants.messageTypes.warningInfo).afterOpened().subscribe()
          } else {
            this.utilService.openDialog(systemMessages.questionTitles.requestNewTutorError, systemMessages.questionMessages.requestNewTutorError, constants.messageTypes.warningInfo).afterOpened().subscribe()
          }
        }
      }
    )
  }

  ngAfterViewChecked(): void {
    if (this.studentService.currentStudent.role === constants.userTypes.tutor) {
      this.isTutor = true;
    }
  }

  uploadAttachment() {
    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(() => {
      // @ts-ignore
      this.uploadFile(this.fileToUpload, progressDialog)
    });
  }

  uploadFile(file: File, progressDialog: MatDialogRef<any>) {
    const time = new Date().getTime();
    // @ts-ignore
    const path = constants.storage_collections.chat + constants.url_sign.url_separator + this.chatToken + constants.url_sign.url_separator + time + constants.url_sign.underscore + file.name;
    this.taskRef = this.storage.ref(path);
    this.task = this.taskRef.put(file);
    this.task.then(() => {
      this.taskRef.getDownloadURL().subscribe(
        (res) => {
          this.uploadReady = false;
          let attachment: Attachment = {extension: file.type, downloadUrl: res, fileName: file.name}
          this.chat.attachments.push(attachment);
          // @ts-ignore
          this.chatService.sendMessage(this.chatToken, this.fileToUpload?.name, this.time.time, true, attachment.downloadUrl, attachment.extension);
          attachment = {
            downloadUrl: "",
            fileName: "",
            extension: ''
          }
          this.chatService.createChat(this.chatToken, this.chat);
          this.isSendButtonDissabled = true;
          this.attachementPicked = false;
          this.uploadReady = true;
        }, () => {
          this.isSendButtonDissabled = true;
          this.attachementPicked = false;
          this.uploadReady = true;
          console.log("upload error");
        }, () => {
          progressDialog.close();
        }
      )
    });
  }

  onChangeQuote() {
    this.enableChangeQuote = true;
  }

  onSendQuote() {
    this.paymentService.findPreviousQuote(this.chatToken).subscribe(
      (res) => {
        console.log(res.docs);
        if (res.docs.length > 0) {
          this.paymentService.invalidateLastQuote(this.chatToken, res.docs[0].id).then(() => {
            const data = {
              isQuoteSend: true,
              isQuoteApproved: true,
              fee: this.quote.value
            }
            if (this.question.fee !== this.quote.value) {
              this.questionService.tutorSendQuote(this.chatToken, data);
              this.utilService.getTimeFromTimeAPI().subscribe((res) => {
                this.enableChangeQuote = false;
                // @ts-ignore
                this.chatService.sendQuoteMessage(this.chatToken, res.time, this.quote.value, this.studentService.currentStudent.profileImage);
                // this.mailService.sendQuoteMailToStudent(this.chat.studentEmail).subscribe();
              })
            } else {
              this.utilService.openDialog(systemMessages.questionTitles.alreadySameFee, systemMessages.questionMessages.alreadySameFee, constants.messageTypes.warningInfo).afterClosed().subscribe()
            }
          })
        } else {
          const data = {
            isQuoteSend: true,
            isQuoteApproved: true,
            fee: this.quote.value
          }
          if (this.question.fee !== this.quote.value) {
            this.questionService.tutorSendQuote(this.chatToken, data);
            this.utilService.getTimeFromTimeAPI().subscribe((res) => {
              // @ts-ignore
              this.chatService.sendQuoteMessage(this.chatToken, res.time, this.quote.value, this.studentService.currentStudent.profileImage);
              this.enableChangeQuote = false;
              // this.mailService.sendQuoteMailToStudent(this.chat.studentEmail).subscribe();
            })
          } else {
            this.utilService.openDialog(systemMessages.questionTitles.alreadySameFee, systemMessages.questionMessages.alreadySameFee, constants.messageTypes.warningInfo).afterClosed().subscribe()
          }
        }
      }
    )

  }

  onApproveQuote() {
    const data = {
      isQuoteApproved: true
    }
    this.studentService.findStudentById(this.chat.tutorId).subscribe(
      (res) => {
        // @ts-ignore
        // this.mailService.quoteApprovalMailToTutor(res.email).subscribe();
      }
    )

    this.utilService.getTimeFromTimeAPI().subscribe((res) => {
      // @ts-ignore
      this.chatService.sendApproveQuoteMessage(this.chatToken, res.time, this.quote.value);

    })
    this.questionService.studentApproveQuote(this.chatToken, data);
  }

  onUnAuthorizedMessageSent(message: string) {
    constants.unAuthorizedKeywords.forEach(keyword => {
      if (message.includes(keyword)) {
        this.mailService.sendMail("Suspicious chat is identified !!", constants.adminEmail, constants.getSuspisiousMessageReplacement(this.chat.questionNumber, this.chat.tutorChatLink), constants.mailTemplates.suspiciousMsg).subscribe()
      }
    })
  }

  onRequestRefund() {
    this.utilService.openDialog(systemMessages.questionTitles.requestRefund, systemMessages.questionMessages.requestRefund, constants.messageTypes.confirmation).afterClosed().subscribe(
      (res) => {
        if (res) {
          this.utilService.getTimeFromTimeAPI().subscribe(
            (res1) => {
              // @ts-ignore
              this.paymentService.requestRefund(this.chatToken, this.question.fee, this.question.studentId, this.question.studentName, this.question.tutorId, this.question.tutorName, this.question.questionTitle, res1.time);
              this.mailService.sendMail("A refund request has been initiated", constants.adminEmail, constants.getRefundRequest(this.question.questionNumber), constants.mailTemplates.refundRequest).subscribe();
            }
          )
          const data = {
            isRefundRequested: true
          }
          this.questionService.updateQuestion(this.chatToken, data);
          this.utilService.openDialog(systemMessages.questionTitles.requestRefund, systemMessages.questionMessages.requestRefundSuccess, constants.messageTypes.warning).afterClosed().subscribe()
        }
      }
    )
  }

  onFocus() {
    this.isFocused = true;
    console.log(this.isTyping);
    this.chatService.onTyping(this.chatToken, true);
  }

  onBlur() {
    this.isFocused = false;
    this.chatService.onTyping(this.chatToken, false);
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (event.target.scrollTop === 0) {
      this.chatService.getNextMessages(this.chatToken, this.chatMessages[0].time).valueChanges().subscribe(
        (res) => {
          console.log(res.length);
          // @ts-ignore
          this.chatMessages.unshift(...res);
        }
      )
    }
  }


  onCancelRequest() {
    this.utilService.openDialog(systemMessages.questionTitles.tutorReleaseQuestionConfirmation, systemMessages.questionMessages.questionCancelConfirm, constants.messageTypes.confirmation).afterClosed().subscribe(
      (res) => {
        if (res) {
          const data = {
            status: constants.questionStatus.cancelled
          }
          this.questionService.updateQuestion(this.chatToken, data).then(() => {
              this.cancelledQustion = true;
            }
          );
        }
      }
    )
  }

  onMarkAsCompleted() {
    this.questionService.markQuestionUpdate(this.question.id).then(() => {
      this.utilService.getTimeFromTimeAPI().subscribe((res) => {
        if (res) {
          // @ts-ignore
          this.chatService.MarkAsCompleted(this.question.id, res.time).then(() => {
            // @ts-ignore
            this.chatService.markAsCompletedMessage(this.chatToken, res.time, this.quote.value, this.studentService.currentStudent.profileImage).then(() => {
              this.mailService.sendMail("Your work has been completed.", this.question.studentEmail, constants.getCompleteRequest(this.question.id, this.question.questionTitle, this.question.studentName), constants.mailTemplates.questionComplete).subscribe();
            });
            // tutor payment increase
            this.studentService.incrementTutorEarning(this.question.tutorId, this.question.fee * constants.tutor_pay_percentage).then(() => {
              this.questionService.incrementCompletedQuestionCount()
            });
          })
        }
      });
    });
  }
}
