import {Injectable} from '@angular/core';
import {AngularFireMessaging} from "@angular/fire/messaging";
import * as firebase from "firebase";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notification$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
  }

  setNotification(notification: any) {
    console.log(notification);
    this.notification$.next(notification);
  }

  getNotification() {
    return this.notification$.asObservable();
  }
}
