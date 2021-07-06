import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatServiceService} from "../../../services/chat-service.service";
import {ChatMsg} from "../../../models/chat-msg";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-test-chat',
  templateUrl: './test-chat.component.html',
  styleUrls: ['./test-chat.component.scss']
})
export class TestChatComponent implements OnInit {

  chatToken: string | null = '';
  tests: ChatMsg[] = [];
  msg: ChatMsg = {message: "", receiverId: "", senderId: "", sentBy: "", time: 0};
  chatHistory: ChatMsg[] = [];
  uid: any;
  chatIds: string[] | undefined = [];
  form = new FormGroup({
    chatMsg: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private chatService: ChatServiceService,
              private angularFireAuth: AngularFireAuth,
              public authService: AuthService,) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      map => {
        this.chatToken = map.get('chatToken');
      }
    );

    this.authService.getTestData(
      "aw9dJW2YjYQUTFx311IkC99JfVH3_a5Odi8aVZgh7kW9CC8KxhuJ6vhG3").subscribe(
      (res) => {
        console.log(res);
        // @ts-ignore
        this.chatHistory = res;
      }
    );
    this.uid = this.angularFireAuth.auth.currentUser?.uid;
    this.chatIds = this.chatToken?.split('_');
    console.log(this.chatIds);
  }

  onChat() {
    console.log(this.form.controls['chatMsg'].value);
    console.log( this.angularFireAuth.auth.currentUser?.uid);
    this.saveChatMsg();
  }

  saveChatMsg() {
    console.log(this.authService.userData.uid);
    this.chatIds?.splice(this.authService.userData.uid);
    this.msg.senderId = this.authService.userData.uid;
    this.msg.receiverId = "a5Odi8aVZgh7kW9CC8KxhuJ6vhG3";
    this.msg.message = this.form.controls['chatMsg'].value;
    this.msg.sentBy = this.authService.userData.uid;
    this.msg.time = Date.now();

    this.chatService.saveMsg(this.msg,"aw9dJW2YjYQUTFx311IkC99JfVH3_a5Odi8aVZgh7kW9CC8KxhuJ6vhG3");
  }

}

