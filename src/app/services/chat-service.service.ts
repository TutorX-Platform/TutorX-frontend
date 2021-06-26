import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {ChatMsg} from "../models/chat-msg";

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(public angularFirestoreService: AngularFirestore) {
  }

  saveMsg(msg: ChatMsg, chatId: string) {
    const chatRef: AngularFirestoreDocument<any> = this.angularFirestoreService.doc(`chats/${chatId}`).collection("chats").doc(Date.now().toString());
    chatRef.set(msg);
  }
}
