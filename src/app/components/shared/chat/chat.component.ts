import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {Location} from "@angular/common";
import {QuestionService} from "../../../services/question-service.service";
import {StudentService} from "../../../services/student-service.service";
import {UtilService} from "../../../services/util-service.service";
import {TimeApi} from "../../../models/time-api";
import {Questions} from "../../../models/questions";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "angularfire2/storage";
import {CardDetailsComponent} from "../payment-gateway/card-details/card-details.component";
import * as systemMessages from '../../../models/system-messages'
import {MailService} from "../../../services/mail.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  // @ts-ignore
  @ViewChild('scrollMe') private myScroll: ElementRef;
  message = new FormControl(null);
  quote = new FormControl('');
  isSendButtonDissabled = true;
  messages: any = [];
  chatToken: string = '';
  // @ts-ignore
  taskRef: AngularFireStorageReference;
  // @ts-ignore
  chatForm: FormGroup;
  // @ts-ignore
  task: AngularFireUploadTask;
  attachments: string[] = [];
  chat: Chat = {
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
  dueDateTime = new Date();
  dueDateTimeControll = new FormControl('');
  time: TimeApi = {status: "", time: 0};

  dummyProfPic = constants.dummy_profile_picture;
  isDetailedView = false;
  selectedPage = 1;
  fileToUpload: File | null = null;
  uploadReady = false;

  isSendQuoteDissabled = true;
  attachementPicked = false;
  isNotLoggedUser = false;
  notLoggedUserEmail = 'sandunsameera25@gmail.com';

  test = new Date('Sep 01 2021 00:00:00');

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
              private studentService: StudentService) {
  }

  ngOnInit(): void {
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
    console.log(this.studentService.currentStudent)
    if (this.studentService.currentStudent.role === constants.userTypes.tutor) {
      this.isTutor = true;
    }

    this.scrollToBottom();
  }


  onSend() {
    this.utilService.getTimeFromTimeAPI().subscribe((res) => {
      // @ts-ignore
      this.time = res;
      if (!this.attachementPicked) {
        // @ts-ignore
        this.chatService.sendMessage(this.chatToken, this.message.value, this.time.time, false);
      } else {
        // @ts-ignore
        this.chatService.sendMessage(this.chatToken, this.fileToUpload?.name, this.time.time, true);
        this.uploadAttachment();
      }
      this.message.reset();
      this.isSendButtonDissabled = true;
    });
  }

  scrollToBottom(): void {
    try {
      this.myScroll.nativeElement.scrollTop = this.myScroll.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  getChatDetails() {
    const progressDailog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDailog.afterOpened().subscribe(
      (res) => {
        this.chatService.getChat(this.chatToken).valueChanges().subscribe(
          (res) => {
            // @ts-ignore
            this.chat = res;
            console.log(this.chat);
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
              console.log(res);
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
      alert("please login ");
    }
  }

  getQuestion(id: string) {
    this.questionService.getQuestionById(id).valueChanges().subscribe(
      (res) => {
        // @ts-ignore
        this.questionService.question = res;
        // @ts-ignore
        this.dueDateTimeControll.value = this.questionService.question.dueDate.toDate();
        console.log(res);
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
        this.questionService.releaseQuestionByTutor(this.chatToken, data);
      })
    } else {
      this.utilService.openDialog(systemMessages.questionTitles.tutorReleaseQuestionError, systemMessages.questionMessages.tutorReleaseQuestionError, constants.messageTypes.warningInfo).afterOpened().subscribe()
    }

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
          this.chat.attachments.push(res);
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

  onSendQuote() {
    const data = {
      isQuoteSend: true,
      fee: this.quote.value
    }
    this.questionService.tutorSendQuote(this.chatToken, data);
    this.utilService.getTimeFromTimeAPI().subscribe((res) => {
      // @ts-ignore
      this.chatService.sendQuoteMessage(this.chatToken, res.time, this.quote.value);
      this.mailService.sendQuoteMailToStudent(this.chat.studentEmail).subscribe();

    })

  }

  onApproveQuote() {
    const data = {
      isQuoteApproved: true
    }
    this.studentService.findStudentById(this.chat.tutorId).subscribe(
      (res) => {
        // @ts-ignore
        this.mailService.quoteApprovalMailToTutor(res.email).subscribe();
      }
    )

    this.utilService.getTimeFromTimeAPI().subscribe((res) => {
      // @ts-ignore
      this.chatService.sendApproveQuoteMessage(this.chatToken, res.time, this.quote.value);

    })
    this.questionService.studentApproveQuote(this.chatToken, data);
  }

}
