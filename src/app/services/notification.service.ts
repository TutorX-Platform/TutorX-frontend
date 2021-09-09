import {Injectable} from '@angular/core';
import {AngularFireMessaging} from "@angular/fire/messaging";
import * as firebase from "firebase";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../environments/environment";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Questions} from "../models/questions";
import * as constants from "../models/constants";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notification$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private angularFirestoreService: AngularFirestore) {
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
}
