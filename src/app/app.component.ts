import {Component, OnInit} from '@angular/core';
import {NotificationService} from "./services/notification.service";
import {Subscription} from "rxjs";
import {AngularFireMessaging} from "@angular/fire/messaging";
import {AngularFireAuth} from "@angular/fire/auth";
import {UtilService} from "./services/util-service.service";
import * as systemMessages from '../app/models/system-messages';
import * as constants from '../app/models/constants';

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

  constructor(private notificationService: NotificationService,
              public angularFireAuth: AngularFireAuth,
              private utilService: UtilService,
              private afMessaging: AngularFireMessaging,) {
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
}



