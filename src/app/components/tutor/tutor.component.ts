import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Question } from 'src/app/models/question';
import { Student } from 'src/app/models/student';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student-service.service';
import { AddQuestionComponent } from '../shared/add-question/add-question.component';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {

  selectedPage = 1;
  showFiller = false;
  askedQuestions: any[] = [];
  isLoading = true;

  currentStudent: Student = {
    email: "",
    firstName: "",
    isVerified: '',
    lastName: "",
    profileImage: "",
    questions: [],
    uniqueKey: "",
    userId: ""
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    public studentService: StudentService,
    public authService: AuthService,
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
  }

  addQuestion() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.height = "810px";
    this.dialog.open(AddQuestionComponent, dialogConfig);
  }

}
