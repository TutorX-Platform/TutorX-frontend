import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {StudentService} from "../../../services/student-service.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProgressDialogComponent} from "../../shared/progress-dialog/progress-dialog.component";
import * as constants from "../../../models/constants";
import {Review} from "../../../models/review";
import {ReviewService} from "../../../services/review.service";

@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.scss']
})
export class TutorDashboardComponent implements OnInit {
  rating = 4;
  reviews: Review[] = [];

  constructor(
    public studentService: StudentService,
    private dialog: MatDialog,
    private reviewService: ReviewService
  ) {
  }

  ngOnInit(): void {
    const progressDailog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDailog.afterOpened().subscribe(
      () => {
        this.getLoggedUser(progressDailog);
      }
    )
  }

  getLoggedUser(progressDialog: MatDialogRef<any>) {
    this.studentService.findStudentDetails().subscribe(
      (res) => {
        console.log(res);
        if (res) {
          // @ts-ignore
          this.studentService.currentStudent = res;
          this.findReviews();
        }
        progressDialog.close();
      }, () => {
        progressDialog.close();
      }, () => {
        progressDialog.close();
      }
    )
  }

  findReviews() {
    this.reviewService.findReviews(this.studentService.currentStudent.userId).valueChanges().subscribe(
      (res) => {
        // @ts-ignore
        this.reviews = res;
      }
    );
  }

}
