import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as constants from '../../../../models/constants';
import {QuestionService} from "../../../../services/question-service.service";

@Component({
  selector: 'app-succes-message',
  templateUrl: './succes-message.component.html',
  styleUrls: ['./succes-message.component.scss']
})
export class SuccesMessageComponent implements OnInit {

  isSuccess = true;
  // @ts-ignore
  amount: string;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private questionService:QuestionService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      map => {
        // @ts-ignore
        this.amount = map.get('amount');
      }
    );
  }

  onChat() {
    this.router.navigate([constants.routes.student + 'chat/' + this.questionService.question.id])
  }

}
