import {Injectable} from '@angular/core';

;
import {BehaviorSubject} from "rxjs";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import * as constants from "../models/constants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notification$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private angularFirestoreService: AngularFirestore, private http: HttpClient,) {
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

  sendNotification(title: string, notification: string, receiveToken: string) {
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
    return this.http.post(constants.firebase_notification_url, body, httpOptions);
  }


  getNotificationToken(uid: string) {
    // @ts-ignore
    const notRef: AngularFirestoreDocument<any> = this.angularFirestoreService.collection(constants.collections.tokens).doc(uid);
    return notRef;
  }
}
