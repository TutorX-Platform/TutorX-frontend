import {Injectable} from '@angular/core';

;
import {BehaviorSubject} from "rxjs";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import * as constants from "../models/constants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Questions} from "../models/questions";
import {Notification} from "../models/notification";
import {UtilService} from "./util-service.service";
import {firestore} from "firebase";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notification$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private angularFirestoreService: AngularFirestore,
              private http: HttpClient,
              private utilService: UtilService) {
  }

  setNotification(notification: any) {
    console.log(notification);
    this.notification$.next(notification);
  }

  getNotification() {
    return this.notification$.asObservable();
  }

  saveToken(uid: string, data: any) {
    const questionRef: AngularFirestoreDocument<any> = this.angularFirestoreService.collection(constants.collections.tokens).doc(uid);
    return questionRef.set(data);
  }

  saveNotification(uid: string, data: any) {
    const unread = {
      unReadCount: 0
    }
    return this.angularFirestoreService.collection(constants.collections.notifications).doc(uid).collection('notifications').add(data);
    return this.angularFirestoreService.collection(constants.collections.utils).doc(uid).collection('unReadNotifications').add(data);
  }

  incrementUnReadNotification(uid: string) {
    // @ts-ignore
    const statRef = this.angularFirestoreService.collection(constants.collections.tokens).doc(uid);
    const increment = firestore.FieldValue.increment(1);
    return statRef.update({'unReadCount': increment});
  }

  getNotifications(uid: string) {
    // @ts-ignore
    const notificationRef = this.angularFirestoreService.collection(constants.collections.notifications).doc(uid).collection(constants.collections.notifications, ref =>
      ref.orderBy('time', 'asc').limitToLast(7));
    return notificationRef;
  }

  sendNotification(title: string, notification: string, receiveToken: string, uid: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': constants.firebase_notification_auth_key,
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({})
    };
    const body = {
      "notification": {
        "title": title,
        "body": notification
      },
      "to": receiveToken
    }

    this.utilService.getTimeFromTimeAPI().subscribe(
      (res) => {
        const data: Notification = {
          body: notification,
          // @ts-ignore
          time: res.time,
          title: title
        }
        this.saveNotification(uid, data);
      }
    )
    return this.http.post(constants.firebase_notification_url, body, httpOptions);
  }


  getNotificationToken(uid: string) {
    // @ts-ignore
    const notRef: AngularFirestoreDocument<any> = this.angularFirestoreService.collection(constants.collections.tokens).doc(uid);
    return notRef;
  }
}
