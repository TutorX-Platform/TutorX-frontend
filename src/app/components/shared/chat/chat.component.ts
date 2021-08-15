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
import {SignInComponent} from "../../auth/sign-in/sign-in.component";
import {DummyComponent} from "../../test/dummy/dummy.component";
import {Location} from "@angular/common";
import {QuestionService} from "../../../services/question-service.service";
import {Question} from "../../../models/question";
import {StudentService} from "../../../services/student-service.service";
import {UtilService} from "../../../services/util-service.service";
import {TimeApi} from "../../../models/time-api";
import {Questions} from "../../../models/questions";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  // @ts-ignore
  @ViewChild('scrollMe') private myScroll: ElementRef;
  message = new FormControl('');
  messages: any = [];
  chatToken: string = '';
  // @ts-ignore
  chatForm: FormGroup;
  chat: Chat = {
    createdDate: new Date(),
    chatLink: "",
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
  timeApi: TimeApi;

  constructor(private chatService: ChatServiceService,
              private utilService: UtilService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              public authService: AuthService,
              private clipboardApi: ClipboardService,
              public questionService: QuestionService,
              public router: Router,
              private dialog: MatDialog,
              private location: Location,
              private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      map => {
        // @ts-ignore
        this.chatToken = map.get('id');
      }
    );

    if (this.studentService.currentStudent.role === constants.userTypes.tutor) {
      this.isTutor = true;
    }
    this.getChatDetails();

    this.utilService.getTimeFromTimeAPI().subscribe(
      (res) => {
        console.log(res);
        // @ts-ignore
        this.timeApi = res;
        console.log(this.timeApi)
      }
    )
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onSend() {
    // @ts-ignore
    this.chatService.sendMessage(this.chatToken, this.message.value)
    this.message.reset();
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
            console.log(res);
            // @ts-ignore
            this.chat = res;
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
        if (this.chat.tutorId === this.authService.student.userId || this.chat.studentId === this.authService.student.userId) {
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
          alert("you dont have permissions to view this chat");
          this.router.navigate([constants.routes.home])
        }
      }, () => {
        progressDialog.close();
      }
    )
  }

  onCopyLink() {
    this.clipboardApi.copyFromContent(this.chat.chatLink);
  }


  onPay() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "433px";
    dialogConfig.data = this.chatToken;
    // dialogConfig.height = "650px";
    this.dialog.open(DummyComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe(
      (res) => {
        console.log(res);
      }
    )
  }

  getQuestion(id: string) {
    this.questionService.getQuestionById(id).valueChanges().subscribe(
      (res) => {
        // @ts-ignore
        this.questionService.question = res;
        console.log(res);
      }
    )
  }

  onNavigateBack() {
    this.location.back();
  }
}
