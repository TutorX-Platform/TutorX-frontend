import {Input} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as constants from '../../../models/constants';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddQuestionComponent} from "../add-question/add-question.component";

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
  @Input() public isTutorJoined: boolean = false;


  constructor(private router: Router,
              private dialog: MatDialog,) {
  }

  ngOnInit(): void {
  }

  onViewChat() {
    console.log("abc");
    this.router.navigate([constants.routes.testChat, 'Q26d22030-0520-47bd-8f5a-7fbc5bde2d33'])
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
      images: this.images
    }
    dialogConfig.width = "100%";
    this.dialog.open(AddQuestionComponent, dialogConfig);
  }
}
