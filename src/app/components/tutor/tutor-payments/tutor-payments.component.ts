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
  dummyAvatar = constants.dummy_profile_picture;

  now = new Date();
  months = [
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

  constructor(private paymentService: PaymentService,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(
      () => {
        this.paymentService.getPaymentsForTutor(this.authService.student.userId).valueChanges().subscribe(
          (res) => {
            // @ts-ignore
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

}
