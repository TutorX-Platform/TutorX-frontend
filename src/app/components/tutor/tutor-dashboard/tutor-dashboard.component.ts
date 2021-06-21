import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.scss']
})
export class TutorDashboardComponent implements OnInit {

  questions : Question[] = [];
  constructor(private breakpointObserver: BreakpointObserver) { }
  showFiller = false;
  ngOnInit(): void {
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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

   
}
