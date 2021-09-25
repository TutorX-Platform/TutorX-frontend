import {Injectable} from '@angular/core';
import * as constants from "../models/constants";
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Payment} from "../models/payment";
import {AngularFirestoreCollection} from 'angularfire2/firestore';
import {Refund} from "../models/refunds";
import {firestore} from "firebase";


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
    const paymentRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.payments, ref => ref.where("tutorId", "==", tutorId).limit(10));
    return paymentRef;
  }

  getPaymentsByMonthForTutor(tutorId: string, month: number) {
    // @ts-ignore
    const paymentRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.payments, ref => ref.where("tutorId", "==", tutorId).where('month', '==', month).limit(10));
    return paymentRef;
  }

  requestRefund(questionId: string, amount: number, studentId: string, studentName: string, tutorId: string, tutorName: string, questionTitle: string, time: number) {
    const refund: Refund = {
      time: time,
      id: questionId,
      isApproved: false,
      isRefunded: false,
      message: constants.refundMessages.dummy,
      questionId: questionId,
      refundAmount: amount,
      studentId: studentId,
      studentName: studentName,
      title: questionTitle,
      tutorId: tutorId,
      tutorName: tutorName

    }
    // @ts-ignore
    const paymentRef: AngularFirestoreDocument<Refund> = this.angularFirestoreService.collection(constants.collections.refund).doc(questionId);
    return paymentRef.set(refund);
  }

  incrementPayment(amount: number) {
    const statRef = this.angularFirestoreService.collection(constants.collections.stat).doc("stats");
    const increment = firestore.FieldValue.increment(amount);
    statRef.update({'payments': increment});
  }
}
