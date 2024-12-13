import { Component, OnInit } from '@angular/core';
import {Student} from "../../../models/student";
import * as constants from "../../../models/constants";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {StudentService} from "../../../services/student-service.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {AddQuestionComponent} from "../add-question/add-question.component";

@Component({
  selector: 'app-non-auth-chat',
  templateUrl: './non-auth-chat.component.html',
  styleUrls: ['./non-auth-chat.component.scss']
})
export class NonAuthChatComponent implements OnInit {

  selectedPage = 1;
  showFiller = false;
  askedQuestions: any[] = [];
  isLoading = true;
  isLoggedIn = false;

  currentStudent: Student = {
    visibleName: "",
    email: "",
    firstName: "",
    isVerified: '',
    lastName: "",
    profileImage: "",
    questions: [],
    uniqueKey: "",
    userId: "",
    role: ''
  };

  dummyProfPic = constants.dummy_profile_picture;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    public studentService: StudentService,
    public authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    console.log(this.studentService.currentStudent);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 1000px)'])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  changePage(num: number) {
    this.selectedPage = num;
    this.router.navigate([constants.routes.student_q_pool],{skipLocationChange: true});
  }

  addQuestion() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.height = "810px";
    this.dialog.open(AddQuestionComponent, dialogConfig);
  }

  onSignOut() {
    this.isLoggedIn = !!localStorage.getItem(constants.localStorageKeys.user);
    this.authService.onSignOut();
    this.router.navigate(['/'],{skipLocationChange: true});
  }

}
