import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatServiceService} from "../../../services/chat-service.service";
import {ChatMsg} from "../../../models/chat-msg";
import {AngularFireAuth} from "@angular/fire/auth";
import {Review} from "../../../models/review";
import {ReviewService} from "../../../services/review.service";
import {Observable} from "rxjs";
import {Chat} from "../../../models/chat";
import * as constants from '../../../models/constants';


@Component({
  selector: 'app-test-chat',
  templateUrl: './test-chat.component.html',
  styleUrls: ['./test-chat.component.scss']
})
export class TestChatComponent implements OnInit {

  reviewDesc = "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."
  reviewTitle = "This is dummy review...";
  reviewer = "Sandun sameera"
  rating = 4.6
  tutorId = "siQVfWgfl2a6GxZyCktojnUWAOj1";

  chatToken: string | null = '';
  // @ts-ignore
  chatForm: FormGroup;
  messages: ChatMsg[] = [];
  // @ts-ignore
  chat: Chat;
  hideJoinChat = false;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private chatService: ChatServiceService,
              private angularFireAuth: AngularFireAuth,
              private reviewService: ReviewService,
              public authService: AuthService,) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      map => {
        this.chatToken = map.get('id');
      }
    );

    this.chatForm = this.formBuilder.group({
      message: ['', Validators.required],
    });

    this.getMessages();
  }


  putReview() {
    const review: Review = {
      tutorId: this.tutorId,
      description: this.reviewDesc,
      rating: this.rating,
      student: this.reviewer,
      title: this.reviewTitle
    };

    this.reviewService.postReview(review).then(
      (v) => {
        console.log(v);
      }
    )
  }

  onSend() {
    // @ts-ignore
    // this.chatService.sendMessage(this.chatToken, this.chatForm.controls.message.value, "", "")
  }

  onJoinTutor() {
    if (this.authService.isLoggedIn) {
      // @ts-ignore
      // this.chatService.tutorJoinChat(this.chatToken);
    } else {
      alert("not logged in")
    }
    console.log(this.authService.student.userId)
  }

  getMessages() {
    // @ts-ignore
    this.chatService.getChat(this.chatToken).valueChanges().subscribe(
      (res) => {
        // @ts-ignore
        this.chat = res;
        if (this.chat.tutorId === this.authService.student.userId || this.chat.studentId === this.authService.student.userId) {
          this.hideJoinChat = true;
          // @ts-ignore
          this.chatService.getMessages(this.chatToken).valueChanges().subscribe(
            res => {
              // @ts-ignore
              this.messages = res;
              console.log(res);
            }
          );
        } else {
          alert("you dont have permissions to view this chat");
        }
      }
    )
  }

}

