import {Component, OnInit} from '@angular/core';
import {Payment} from 'src/app/models/payment';
import {PaymentService} from "../../../services/payment.service";
import {AuthService} from "../../../services/auth.service";
import {ProgressDialogComponent} from "../../shared/progress-dialog/progress-dialog.component";
import * as constants from "../../../models/constants";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-tutor-payments',
  templateUrl: './tutor-payments.component.html',
  styleUrls: ['./tutor-payments.component.scss']
})
export class TutorPaymentsComponent implements OnInit {
  payments: Payment[] = [];
  allPayments: Payment[] = [];
  dummyAvatar = constants.dummy_profile_picture;

  now = new Date();
    months = [
      {
        code: 1,
        name: 'January'
      },
      {
        code: 2,
        name: 'February'
      },
      {
        code: 3,
        name: 'March'
      },
      {
        code: 4,
        name: 'April'
      },
      {
        code: 5,
        name: 'May'
      },
      {
        code: 6,
        name: 'Juny'
      },
      {
        code: 7,
        name: 'July'
      },
      {
        code: 8,
        name: 'August'
      },
      {
        code: 9,
        name: 'September'
      },
      {
        code: 10,
        name: 'October'
      },
      {
        code: 11,
        name: 'November'
      },
      {
        code: 12,
        name: 'December'
      },
    ]

  states = [
    "Recent Payments First",
    "Old Payments First"
  ];

  constructor(private paymentService: PaymentService,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(
      () => {
        this.paymentService.getPaymentsForTutor(this.authService.student.userId).valueChanges().subscribe(
          (res) => {
            // @ts-ignore
            this.allPayments = res;
            this.payments = res;
            this.payments = this.payments.sort(function (a, b) {
              return a.paidTime - b.paidTime;
            }).reverse();
            progressDialog.close();
          }, () => {
            progressDialog.close();
          }
        )
      }
    )
  }

  monthFilter(value: number) {
    this.paymentService.getPaymentsByMonthForTutor(this.authService.student.userId, value).valueChanges().subscribe(res => {
      this.payments = res;
    })
  }

  onSortChange(value: string) {
    if (value === 'Recent Payments First') {
      this.payments = this.allPayments.sort(function (a, b) {
        return a.paidTime - b.paidTime;
      }).reverse();
    } else {
      this.payments = this.allPayments.sort(function (a, b) {
        return a.paidTime - b.paidTime;
      }).reverse().reverse()
    }
  }
}
