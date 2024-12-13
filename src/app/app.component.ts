import {Component, HostListener, OnInit} from '@angular/core';
import {NotificationService} from "./services/notification.service";
import {Subject, Subscription} from "rxjs";
import {AngularFireMessaging} from "@angular/fire/messaging";
import {AngularFireAuth} from "@angular/fire/auth";
import {UtilService} from "./services/util-service.service";
import * as systemMessages from '../app/models/system-messages';
import * as constants from '../app/models/constants';
import {AuthService} from "./services/auth.service";
import {ChatServiceService} from "./services/chat-service.service";
import {StudentService} from "./services/student-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tutorX-frontend';
  test: any;
  message: any;

  // @ts-ignore
  showPanel: boolean;
  notification: any;
  // @ts-ignore
  notificationSub: Subscription;
  notificationTimeout: any;

  // check user active or not
  // @ts-ignore
  userActivity;
  userInactive: Subject<any> = new Subject();

  constructor(private notificationService: NotificationService,
              public angularFireAuth: AngularFireAuth,
              private utilService: UtilService,
              private authService: AuthService,
              private studentService: StudentService,
              private chatService: ChatServiceService,
              private afMessaging: AngularFireMessaging) {
    this.setTimeout();
    this.userInactive.subscribe(() => console.log('user has been inactive for 3s'));
  }

  ngOnInit(): void {
    this.angularFireAuth.authState.subscribe(
      (res) => {
        if (res?.uid) {
          this.requestPermission(res.uid);
          this.listen();
        }
      }
    )
    this.notificationService.getNotification()
      .subscribe(n => {
        this.notification = n;
        this.showPanel = n !== null;

        this.notificationTimeout = setTimeout(() => {
          this.showPanel = false;
        }, 3000);
      });
  }


  requestPermission(uid: string) {
    this.afMessaging.requestToken
      .subscribe(
        (token) => {
          const data = {
            "token": token,
          }
          this.notificationService.saveToken(uid, data);
          console.log(token);
          // TODO: send token to server
        },
        (error) => {
          // this.utilService.openDialog(systemMessages.questionTitles.acceptNotification, systemMessages.questionMessages.acceptNotification, constants.messageTypes.warning).afterOpened().subscribe()
          console.error(error);
        },
      );
  }

  listen() {
    this.afMessaging.messages
      .subscribe((message: any) => {
        console.log(message);
        this.notificationService.setNotification({
          body: message.notification.body,
          title: message.notification.title,
          isVisible: true
        })
      });
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3000);
  }


  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHandler() {
    this.studentService.updateStudentOnline(false, this.authService.student.userId).then()
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler() {
    this.studentService.updateStudentOnline(false, this.authService.student.userId).then()
  }
}



