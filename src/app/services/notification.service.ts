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

  sendNotification() {
    const httpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams({
        fromObject: {
          'Authorization': constants.firebase_notification_auth_key,
          'Content-Type': 'application/json'
        }
      })
    };
    const body = {
      "notification": {
        "title": "Hey there",
        "body": "Pala apakaya ynna"
      },
      "to": "fXaQQ0UKOZ0gT__S692rw2:APA91bH1WrORYaTxw9F6cXcds-SBATo5aBHS44PBn23qOno4ky9iw5-nM8cDmmv-baG7mrb-q9Zrl0IMPHqPGlbNnh7dxyaLP2uwwyeqCbGT8KVK-f_h1-3KRzARCqNzrtL-sQty-o7h"
    }

    return this.http.post(constants.firebase_notification_url, body, httpOptions);

  }
}
