
import {Input} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() public title: string = '';
  @Input() public status: string = '';
  @Input() public subjects: string[] = [];
  @Input() public dueDate: Date = new Date;
  @Input() public descriptionTitle: string = '';
  @Input() public description: string = '';
  @Input() public images: string[] = [];
  @Input() public viewedByAmount: number = 0;


  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onViewChat() {

  }

}
