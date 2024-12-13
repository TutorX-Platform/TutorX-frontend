import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {StudentService} from "../../../services/student-service.service";
import {ProgressDialogComponent} from "../../shared/progress-dialog/progress-dialog.component";
import * as constants from "../../../models/constants";
import {AddQuestionComponent} from "../../shared/add-question/add-question.component";
import {SignInComponent} from "../../auth/sign-in/sign-in.component";
import {SignUpComponent} from "../../auth/sign-up/sign-up.component";

@Component({
  selector: 'app-terms-n-conditions',
  templateUrl: './terms-n-conditions.component.html',
  styleUrls: ['./terms-n-conditions.component.scss']
})
export class TermsNConditionsComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    public studentService: StudentService,) { }

  ngOnInit(): void {
    const progressDailog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDailog.afterOpened().subscribe(
      () => {
        this.getLoggedUser(progressDailog);
      }
    )
  }

  addQuestion() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    // dialogConfig.height = "810px";
    const dialogRef = this.dialog.open(AddQuestionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          if (this.authService.isLoggedIn) {
            this.router.navigate([constants.routes.student_q_pool]);
          }
        }
      }
    )
  }

  addQuestionMobile(){
    this.router.navigate([constants.routes.add_question_mobile]);
  }

  onLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "433px";
    // dialogConfig.height = "650px";
    this.dialog.open(SignInComponent, dialogConfig);
  }

  onSignUp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "433px";
    // dialogConfig.height = "950px";
    this.dialog.open(SignUpComponent, dialogConfig);
  }

  getLoggedUser(progressDialog: MatDialogRef<any>) {
    this.studentService.findStudentDetails().subscribe(
      (res) => {
        console.log(res);
        if (res) {
          // @ts-ignore
          this.studentService.currentStudent = res;
          if (this.studentService.currentStudent.role === constants.userTypes.tutor) {
            console.log('2222222222222222222');
            this.studentService.isTutor = true;
          }
        }
        progressDialog.close();
      }, () => {
        progressDialog.close();
      }, () => {
        progressDialog.close();
      }
    )
  }

  moveToDashboard(){
    if (this.authService.student.role === constants.userTypes.tutor) {
      this.router.navigate([constants.routes.turor.concat(constants.routes.questions)])
    } else if (this.studentService.currentStudent.role === constants.userTypes.student) {
      this.router.navigate([constants.routes.student_q_pool])
    }
  }

}
