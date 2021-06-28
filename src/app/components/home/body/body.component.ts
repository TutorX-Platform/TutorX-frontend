import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddQuestionComponent } from '../../shared/add-question/add-question.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class BodyComponent implements OnInit {

  constructor(    
    private dialog: MatDialog
  ) { }

  selectedNumber = 0;
  feedBackNum = 3;

  ngOnInit(): void {
  }

  details = [
    {title:"Robust workflow", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum"},
    {title:"Flexibility", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum"},
    {title:"User friendly", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum"},
    {title:"Robust workflow", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum"},
    {title:"Flexibility", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum"}
  ]

  feedback = [
    {title1:"Incredible Experience", title2:"Dependable, Responsive, Professional Partner",content1: "We had an incredible experience working with Landify and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the concept so quickly. It acted as a catalyst to take our design to the next level and get more eyes on our product.",content2:"Fermin Apps has collaborated with Landify team for several projects such as Photo Sharing Apps and Custom Social Networking Apps. The experience has been pleasant, professional and exceeding our expectations. The team is always thinking beyond the current tasks & helps us formulate a vision and possibilities for future.",name1:"Jane Cooper", name2:"Jane Cooper", designation1:"CEO, ABC Corporation", designation2:"CEO, ABC Corporation",image1:"../../../../assets/images/profile.jpg", image2:"../../../../assets/images/profile.jpg"},
    {title1:"Very Helpfull", title2:"Highly Appreceated",content1: "We had an incredible experience working with Landify and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the concept so quickly. It acted as a catalyst to take our design to the next level and get more eyes on our product.",content2:"Fermin Apps has collaborated with Landify team for several projects such as Photo Sharing Apps and Custom Social Networking Apps. The experience has been pleasant, professional and exceeding our expectations. The team is always thinking beyond the current tasks & helps us formulate a vision and possibilities for future.",name1:"Jane Cooper", name2:"Jane Cooper", designation1:"CEO, ABC Corporation", designation2:"CEO, ABC Corporation", image1:"../../../../assets/images/profile.jpg", image2:"../../../../assets/images/profile.jpg"},
    {title1:"Incredible Experience", title2:"Dependable, Responsive, Professional Partner",content1: "We had an incredible experience working with Landify and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the concept so quickly. It acted as a catalyst to take our design to the next level and get more eyes on our product.",content2:"Fermin Apps has collaborated with Landify team for several projects such as Photo Sharing Apps and Custom Social Networking Apps. The experience has been pleasant, professional and exceeding our expectations. The team is always thinking beyond the current tasks & helps us formulate a vision and possibilities for future.",name1:"Jane Cooper", name2:"Jane Cooper", designation1:"CEO, ABC Corporation", designation2:"CEO, ABC Corporation", image1:"../../../../assets/images/profile.jpg", image2:"../../../../assets/images/profile.jpg"}
  ]

  tutorFeedbacks = [1,2,3,4,5]

  tutorFeedbacks2 = [1,2,3]

  change(num: number){
    this.selectedNumber = num;
  }

  select(num:number){
    this.feedBackNum = num;
  }

  addQuestion(){    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    this.dialog.open(AddQuestionComponent, dialogConfig);
  }

}