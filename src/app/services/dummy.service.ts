import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {HttpClient} from "@angular/common/http";
import * as constants from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

  testObject: any;

  constructor(public afs: AngularFirestore, private http: HttpClient) {
    this.testObject = this.afs.collection('test').valueChanges();
  }

  getTestItems() {
    return this.testObject;
  }

  pay(body: any) {
    return this.http.post(constants.backend_url.concat(constants.backend_api_resource.payment), body);
  }

}
