import {trigger, transition, style, animate, state} from '@angular/animations';
import {AfterContentChecked, AfterContentInit, Component, OnChanges, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddQuestionComponent} from '../../shared/add-question/add-question.component';
import {AuthService} from "../../../services/auth.service";
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Router} from "@angular/router";
import * as constants from '../../../models/constants';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  animations: [
    trigger('client', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('400ms ease-out')),
      transition('hide => show', animate('400ms ease-in'))
    ]),
    trigger('feedback', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ]),

  ]
})
export class BodyComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  selectedNumber = 0;
  feedBackNum = 2;
  forward = false;
  backward = false;

  show = false;
  showFeedback = false;

  process = [
    {
      title: "Upload your homework",
      subtitle: "Turn your idea from concept to MVP"
    },
    {
      title: "Talk to a tutor",
      subtitle: "Sketch out the product to align the user needs"
    },
    {
      title: "Get a quote",
      subtitle: "Convert the designs into a live application"
    },
    {
      title: "Make the payment",
      subtitle: "Launching the application to the market"
    },
    {
      title: "Get the assistance",
      subtitle: "Launching the application to the market"
    },
  ];
  customOptions!: OwlOptions;

  get stateName() {
    return this.show ? 'show' : 'hide'
  }

  get feedbackStateName() {
    return this.showFeedback ? 'show' : 'hide'
  }

  changeState() {
    this.show = true;
  }

  changeStateFeedback() {
    this.showFeedback = true;
  }

  ngOnInit(): void {
    this.customOptions = {
      loop: false,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: true,
      navSpeed: 300,
      nav: false,
      responsiveRefreshRate: 100,
      autoHeight: true,
      autoWidth: true,
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 1
        },
        740: {
          items: 2
        },
        1024: {
          items: 2
        }
      }
    }
  }

  slideConfig = {
    slidesToShow: 2,
    dots: true,
    arrows: false,
    mouseDrag: true,
    touchDrag: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  details = [
    {
      title: "User Friendly",
      description: "Responsive and easy to navigate interfaces",
      imageUrl: "../../../../assets/icons/02.svg"
    },
    {
      title: "Step by step explanations",
      description: "We break it down for you",
      imageUrl: "../../../../assets/icons/03.svg"
    },
    {
      title: "Clean and Correct Answers",
      description: "We provide accurate and original answers",
      imageUrl: "../../../../assets/icons/04.svg"
    },
    {
      title: "Fast Response",
      description: "Instant responses from the tutors 24/7",
      imageUrl: "../../../../assets/icons/05.svg"
    },
    {
      title: "Affordable Service",
      description: "Reasonable quotes based on your requirements. ",
      imageUrl: "../../../../assets/icons/01.svg"
    }
  ]

  feedbacks = [
    {
      title: "Incredible Experience",
      content: "I'm really impressed and grateful to \"tutetory.com\" for helping me to score higher for my python assignment series. These tutors have a good subject mastery and are responsive to my texts anytime. I learned a lot of things which I will never be able to learn during my class practical sessions",
      name: "Jane Cooper",
      designation: "Florida",
      image: "../../../../assets/images/profile.jpg",
    },
    {
      title: "Smooth workflow",
      content: "One of the most outstanding tutoring sites I had worked with. Genius tutors with perfect answers. How easy it is to post my questions to the platform with no hassle at all. Smooth and fast workflow. So excited to get connected again.",
      name: "Jordan Anderson",
      designation: "Ohio",
      image: "../../../../assets/images/profile.jpg",
    },
    {
      title: "Fast Delivery",
      content: "Captain is a true genius. He always finished the work far earlier than the deadline. Could complete my semester with flying colours. I never leave any feedback, but this is going to be the only exception.  The tutor literary saved my life. ",
      name: "Flynn Sullivan",
      designation: "Belfast",
      image: "../../../../assets/images/profile.jpg",
    },
    {
      title: "Excellent Support",
      content: "I was originally skeptical because my deadline was coming up and the codes were not working, but this tutor will go above and beyond to make sure the assignment specifications are met. Absolutely best set of tutors and support team ever!! ",
      name: "Hanna B.",
      designation: "Texas",
      image: "../../../../assets/images/profile.jpg",
    },
    {
      title: "Clear Explanations",
      content: "Recommend tutetory.com to anyone who is struggling for Matlab problems. Explained the code one by when I requested. They have a genius group of tutors. I could get the help of few and all are world-class. Never hesitate to come back. Cheers!",
      name: "Ravi Mishra",
      designation: "Toronto",
      image: "../../../../assets/images/profile.jpg",
    },
    {
      title: "Affordable Prices",
      content: "Best tutoring site I came across. I worked with Captain and Mechanic. Both were highly concerning about timely submissions.I could get all clarifications whenever i asked. No any cost ,they were always available .Really appreciate the hard work. Most trusted tutoring  site",
      name: "Sami Amar",
      designation: "London",
      image: "../../../../assets/images/profile.jpg",
    },
  ]

  tutorFeedbacks = [
    {
      description: "A computer science PhD candidate and a former software engineer specialized in Databases, Algorithms, Blockchain and Machine Learning and programming languages like Python, Java, C and JavaScript",
      image: "assets/images/profile.jpg",
      name: "ExpertCSTutor",
      subject: "Computer Science"
    },
    {
      description: "BSc. Electronic and Electrical Engineering degree holder having 8+ experience in the telecommunication space. An expert in Mathematics, Physics, IP networking, Digital Electronics and Telecommunication",
      image: "assets/images/profile.jpg",
      name: "Captain",
      subject: "Computer Science"
    },
    {
      description: "Masters degree holder and PhD candidate in Mechanical Engineering. Specialized in Mathematics, Fluid Dynamics and Heat flow",
      image: "assets/images/profile.jpg",
      name: "Mechanic",
      subject: "Mechanical Engineering"
    },
    {
      description: "Masters degree holder and PhD candidate in Mechanical Engineering. Specialized in Mathematics, Fluid Dynamics and Heat flow",
      image: "assets/images/profile.jpg",
      name: "Mechanic",
      subject: "Mechanical Engineering"
    },
    {
      description: "Masters degree holder and PhD candidate in Mechanical Engineering. Specialized in Mathematics, Fluid Dynamics and Heat flow",
      image: "assets/images/profile.jpg",
      name: "Mechanic",
      subject: "Mechanical Engineering"
    },
  ]

  tutorFeedbacks2 = [
    {
      description: "A computer science PhD candidate and a former software engineer specialized in Databases, Algorithms, Blockchain and Machine Learning and programming languages like Python, Java, C and JavaScript",
      image: "assets/images/profile.jpg",
      name: "ExpertCSTutor",
      subject: "Computer Science"
    },
    {
      description: "BSc. Electronic and Electrical Engineering degree holder having 8+ experience in the telecommunication space. An expert in Mathematics, Physics, IP networking, Digital Electronics and Telecommunication",
      image: "assets/images/profile.jpg",
      name: "Captain",
      subject: "Computer Science"
    },
    {
      description: "Masters degree holder and PhD candidate in Mechanical Engineering. Specialized in Mathematics, Fluid Dynamics and Heat flow",
      image: "assets/images/profile.jpg",
      name: "Mechanic",
      subject: "Mechanical Engineering"
    }
  ]

  change(num: number) {
    console.log(this.forward);
    this.show = !this.show;
    if (num > this.selectedNumber) {
      this.forward = true;
      this.backward = false;
      // this.sh = true;
    } else if (num < this.selectedNumber) {
      this.forward = false;
      this.backward = true;
    } else {
      this.forward = false;
      this.backward = false;
    }

    setTimeout(() => {
      this.selectedNumber = num;
    }, 400);
  }

  select(num: number) {
    this.showFeedback = !this.showFeedback;
    this.feedBackNum = num;
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
            this.router.navigate([constants.routes.student_q_pool], {skipLocationChange: true});
          }
        }
      }
    )
  }
}
