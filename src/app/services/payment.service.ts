import {Injectable} from '@angular/core';
import * as constants from "../models/constants";
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Payment} from "../models/payment";
import {AngularFirestoreCollection} from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private angularFirestoreService: AngularFirestore) {
  }


  recordPayment(data: Payment) {
    const paymentRef: AngularFirestoreCollection<Payment> = this.angularFirestoreService.collection(`${constants.collections.payments}`);
    return paymentRef.add(data);
  }

  getPaymentsForTutor(tutorId: string) {
    // @ts-ignore
    const paymentRef: AngularFirestoreDocument<Payment> = this.angularFirestoreService.collection(constants.collections.payments, ref => ref.where("tutorId", '==', tutorId));
    return paymentRef;
  }
}
