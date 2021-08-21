import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as constants from '../../../../models/constants';

@Component({
  selector: 'app-succes-message',
  templateUrl: './succes-message.component.html',
  styleUrls: ['./succes-message.component.scss']
})
export class SuccesMessageComponent implements OnInit {

  isSuccess = true;

  constructor(
    public router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  onChat() {
    this.router.navigate([constants.routes.student_q_pool])
  }

}
