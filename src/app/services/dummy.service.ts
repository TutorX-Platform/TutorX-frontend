import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

  testObject: any;

  constructor(public afs: AngularFirestore) {
    this.testObject = this.afs.collection('test').valueChanges();
  }

  getTestItems() {
    return this.testObject;
  }

}
