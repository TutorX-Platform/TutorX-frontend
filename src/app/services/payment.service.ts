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


  recordPayment(data: Payment, questionId: string) {
    const paymentRef: AngularFirestoreDocument<Payment> = this.angularFirestoreService.collection(constants.collections.payments).doc(questionId);
    return paymentRef.set(data)
  }

  getPaymentsForTutor(tutorId: string) {
    // @ts-ignore
    const paymentRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.payments, ref => ref.where("tutorId", "==", tutorId).orderBy('paidTime', "desc"));
    return paymentRef;
  }

  getNextPaymentsForTutor(tutorId: string, time: number) {
    // @ts-ignore
    const paymentRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.payments, ref => ref.where("tutorId", "==", tutorId).orderBy('sort', "desc").limit(10).startAfter(time));
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

  findPreviousQuote(chatId: string) {
    const quoteRef = this.angularFirestoreService.collection(constants.collections.message).doc(chatId).collection(constants.collections.chats, ref => ref.where("isQuote", "==", true)).get();
    return quoteRef;
  }

  invalidateLastQuote(chatId: string, docId: string) {
    const data = {
      isValidQuote: false
    }
    const statRef = this.angularFirestoreService.collection(constants.collections.message).doc(chatId).collection(constants.collections.chats).doc(docId);
    return statRef.update(data);
  }

  updatePayment(questionId: string) {
    const data = {
      tutorCredited: true
    }
    const statRef = this.angularFirestoreService.collection(constants.collections.payments).doc(questionId);
    return statRef.update(data)
  }
}
