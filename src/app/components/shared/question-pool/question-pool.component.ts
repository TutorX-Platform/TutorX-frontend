import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question-pool',
  templateUrl: './question-pool.component.html',
  styleUrls: ['./question-pool.component.scss']
})
export class QuestionPoolComponent implements OnInit {

  contactForm!: FormGroup;

  selectedStatus = 0;
 
  countries = [
    { id: 1, name: "United States" },
    { id: 2, name: "Australia" },
    { id: 3, name: "Canada" },
    { id: 4, name: "Brazil" },
    { id: 5, name: "England" }
  ];

  questions : Question[] = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb:FormBuilder
    ) { }
  showFiller = false;
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      country: [null]
    });
    this.questions = [
      {
        title: "Question Title",
        subjects: ['Maths','Computer Science'],
        dueDate: new Date(),
        descriptionTitle: 'Hi Tutors,',
        description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
        status: 'inProgress',
        viewedByAmount: 400,
        images: ['../../../../assets/images/profile.jpg','../../../../assets/images/profile.jpg','../../../../assets/images/profile.jpg']
      },
      {
        title: "Question Title",
        subjects: ['Maths','Computer Science'],
        dueDate: new Date(),
        descriptionTitle: 'Hi Tutors,',
        description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
        status: 'open',
        viewedByAmount: 400,
        images: ['../../../../assets/images/profile.jpg','../../../../assets/images/profile.jpg','../../../../assets/images/profile.jpg']
      }
    ] 
  }

  selectStatus(num:number){
    this.selectedStatus = num;
  }

}
