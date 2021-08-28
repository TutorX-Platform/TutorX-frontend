import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-payments',
  templateUrl: './tutor-payments.component.html',
  styleUrls: ['./tutor-payments.component.scss']
})
export class TutorPaymentsComponent implements OnInit {

  now = new Date();
  months =[
    {
      code: 'JAN',
      name: 'January'
    },
    {
      code: 'FEB',
      name: 'February'
    },
    {
      code: 'MAR',
      name: 'March'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
