import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import * as constants from '../models/constants';
import {Questions} from "../models/questions";
import {Review} from "../models/review";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private angularFirestoreService: AngularFirestore) {
  }

  postReview(data: Review) {
    return this.angularFirestoreService.collection(constants.collections.review).add(data);
  }

  findReviews(tutorId: string) {
    return this.angularFirestoreService.collection(constants.collections.review, ref => ref.where('tutorId', '==', tutorId));
  }
}
