import {Component, OnInit} from '@angular/core';
import {DummyService} from "./services/dummy.service";
import {AuthService} from "./services/auth.service";
import {NotificationService} from "./services/notification.service";
import {Subscription} from "rxjs";
import {AngularFireMessaging} from "@angular/fire/messaging";

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

  constructor(private notificationService: NotificationService, private afMessaging: AngularFireMessaging,) {
  }

  ngOnInit(): void {
    this.requestPermission();
    this.listen();
    this.notificationService.getNotification()
      .subscribe(n => {
        this.notification = n;
        this.showPanel = n !== null;

        this.notificationTimeout = setTimeout(() => {
          this.showPanel = false;
        }, 3000);
      });
  }


  requestPermission() {
    this.afMessaging.requestToken
      .subscribe(
        (token) => {
          console.log(token);
          // TODO: send token to server
        },
        (error) => {
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



