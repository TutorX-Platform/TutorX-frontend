import {Input} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as constants from '../../../models/constants';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() public title: string = '';
  @Input() public status: string = '';
  @Input() public subjects: string = '';
  @Input() public dueDate: Date = new Date;
  @Input() public descriptionTitle: string = 'Hi Tutors';
  @Input() public description: string = '';
  @Input() public images: string[] = [];
  @Input() public viewedByAmount: number = 0;
  @Input() public isTutorJoined: boolean = false;


  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onViewChat() {
    console.log("abc");
    this.router.navigate([constants.routes.testChat, 'Q26d22030-0520-47bd-8f5a-7fbc5bde2d33'])
  }

}
