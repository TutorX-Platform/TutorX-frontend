import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatServiceService} from "../../../services/chat-service.service";
import {ChatMsg} from "../../../models/chat-msg";
import {AngularFireAuth} from "@angular/fire/auth";
import {Review} from "../../../models/review";
import {ReviewService} from "../../../services/review.service";

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

  reviewDesc = "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."
  reviewTitle = "This is dummy review...";
  reviewer = "Sandun sameera"
  rating = 4.6
  tutorId = "siQVfWgfl2a6GxZyCktojnUWAOj1";

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
        this.chatToken = map.get('chatToken');
      }
    );

  }

  onChat() {
    console.log(this.form.controls['chatMsg'].value);
    console.log(this.angularFireAuth.auth.currentUser?.uid);
    this.saveChatMsg();
  }

  saveChatMsg() {

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

}

