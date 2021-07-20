import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {Question} from 'src/app/models/question';
import {QuestionService} from "../../../services/question-service.service";
import {StudentService} from "../../../services/student-service.service";
import * as constants from "../../../models/constants";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Questions } from 'src/app/models/questions';

@Component({
  selector: 'app-question-pool',
  templateUrl: './question-pool.component.html',
  styleUrls: ['./question-pool.component.scss']
})
export class QuestionPoolComponent implements OnInit {

  contactForm!: FormGroup;

  selectedStatus = 0;
  askedQuestions: Questions[] = [];

  countries = [
    {id: 1, name: "United States"},
    {id: 2, name: "Australia"},
    {id: 3, name: "Canada"},
    {id: 4, name: "Brazil"},
    {id: 5, name: "England"}
  ];

  questions: Question[] = [];
  subjects = [
    "Science", "English", "Maths", "Computer Science"
  ]

  states = [
    "Open", "Inprogress", "Assigned", "Cancelled", "Completed"
  ]

  sortings = constants.sortBy_functions;
  options: string[] = ['Maths', 'Science', 'English'];
  filteredOptions?: Observable<string[]>;
  searchControl = new FormControl();

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
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value:string) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectStatus(num: number) {
    this.selectedStatus = num;
  }

  onFilterSelect(event: any) {
    console.log(event);
  }

  getQuestions() {
    this.questionService.getQuestions(this.studentService.currentStudent.uniqueKey).valueChanges().subscribe(
      (res) => {
        // @ts-ignore
        this.askedQuestions = res;
        this.askedQuestions = this.sortQuestions()
        console.log(this.askedQuestions);
      }
    )
  }

  sortQuestions() {
    return this.askedQuestions.sort(function (a, b) {
      // @ts-ignore
      return a.createdDate - b.createdDate;
    });
  }

}
