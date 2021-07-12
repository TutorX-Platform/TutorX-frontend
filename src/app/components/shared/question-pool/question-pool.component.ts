import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Question} from 'src/app/models/question';
import {QuestionService} from "../../../services/question-service.service";
import {StudentService} from "../../../services/student-service.service";

@Component({
  selector: 'app-question-pool',
  templateUrl: './question-pool.component.html',
  styleUrls: ['./question-pool.component.scss']
})
export class QuestionPoolComponent implements OnInit {

  contactForm!: FormGroup;

  selectedStatus = 0;
  askedQuestions = [];

  countries = [
    {id: 1, name: "United States"},
    {id: 2, name: "Australia"},
    {id: 3, name: "Canada"},
    {id: 4, name: "Brazil"},
    {id: 5, name: "England"}
  ];

  questions: Question[] = [];

  constructor(
    private questionService: QuestionService,
    private studentService: StudentService,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder
  ) {
  }

  showFiller = false;

  ngOnInit(): void {
    console.log("aaa");
    this.contactForm = this.fb.group({
      country: [null]
    });
    this.getQuestions();
  }

  selectStatus(num: number) {
    this.selectedStatus = num;
  }

  getQuestions() {
    this.questionService.getQuestions(this.studentService.currentStudent.uniqueKey).valueChanges().subscribe(
      (res) => {
        // @ts-ignore
        this.askedQuestions = res;
        console.log(this.askedQuestions);
      }
    )
  }

}
