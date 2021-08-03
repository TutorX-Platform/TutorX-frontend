import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatServiceService} from "../../../services/chat-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Chat} from "../../../models/chat";
import {ProgressDialogComponent} from "../progress-dialog/progress-dialog.component";
import * as constants from "../../../models/constants";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ChatMsg} from "../../../models/chat-msg";
import {AuthService} from "../../../services/auth.service";
import {ClipboardService} from "ngx-clipboard";

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

  constructor(private chatService: ChatServiceService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              public authService: AuthService,
              private clipboardApi: ClipboardService,
              public router: Router,
              private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      map => {
        // @ts-ignore
        this.chatToken = map.get('id');
      }
    );

    this.getChatDetails();
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
            // @ts-ignore
            this.chat = res;
            this.getMessages(progressDailog);
          }, () => {
            progressDailog.close();
          }
        )
      }
    )

    progressDailog.close()

  }

  getMessages(progressDialog: MatDialogRef<any>) {
    // @ts-ignore
    this.chatService.getChat(this.chatToken).valueChanges().subscribe(
      (res) => {
        // @ts-ignore
        this.chat = res;
        // @ts-ignore
        console.log(res.createdDate['seconds']);
        // @ts-ignore
        this.questionCreatedDate = res.createdDate['seconds'];
        if (this.chat.tutorId === this.authService.student.userId || this.chat.studentId === this.authService.student.userId) {
          this.chatService.getMessages(constants.dummyChatId).valueChanges().subscribe(
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
}
