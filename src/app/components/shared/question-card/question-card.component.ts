import {Input} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as constants from '../../../models/constants';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddQuestionComponent} from "../add-question/add-question.component";
import {QuestionService} from "../../../services/question-service.service";
import {AuthService} from "../../../services/auth.service";
import {StudentService} from "../../../services/student-service.service";

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() public id: string = '';
  @Input() public title: string = '';
  @Input() public status: string = '';
  @Input() public subjects: string = '';
  @Input() public dueDate: Date = new Date;
  @Input() public descriptionTitle: string = 'Hi Tutors';
  @Input() public description: string = '';
  @Input() public images: string[] = [];
  @Input() public viewedByAmount: number = 0;
  @Input() public isTutorJoined: boolean = true;

  role = '';

  constructor(private router: Router,
              private dialog: MatDialog,
              private questionService: QuestionService,
              private authService: AuthService,
              private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.role = this.studentService.currentStudent.role;
  }

  onViewChat() {
    this.router.navigate([constants.routes.chat, this.id])
  }

  onViewDetails() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.id,
      title: this.title,
      status: this.status,
      subjects: this.subjects,
      dueDate: this.dueDate,
      description: this.description,
      images: this.images,
      role: this.role
    }
    dialogConfig.width = "100%";
    this.dialog.open(AddQuestionComponent, dialogConfig);
  }

  acceptQuestion() {
    console.log('abc');
    this.questionService.joinTutorForQuestion(this.id,this.authService.student.userId);
  }
}
