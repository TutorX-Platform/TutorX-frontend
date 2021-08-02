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
    this.chatService.sendMessage(this.chatToken, this.chatForm.controls.message.value)
  }

  getMessages() {
    this.chatService.getMessages('Q26d22030-0520-47bd-8f5a-7fbc5bde2d33').valueChanges().subscribe(
      res => {
        console.log(res)
      }
    );
  }

}

