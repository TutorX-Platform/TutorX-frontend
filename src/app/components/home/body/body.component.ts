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
      title: "Upload your problem",
      subtitle: "Get help in more than 30 subjects"
    },
    {
      title: "Talk to a tutor",
      subtitle: "Chat with one of the expert in the field"
    },
    {
      title: "Get a quote",
      subtitle: "Negotiate and decide the payment"
    },
    {
      title: "Make the payment",
      subtitle: "Using your preffered payment method"
    },
    {
      title: "Get the assistance",
      subtitle: "Get your work done and explanations"
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
      title: "Expert Tutors",
      description: "With highest academic qualifications",
      imageUrl: "../../../../assets/icons/04.svg"
    },
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
      name: "Jane C.",
      designation: "Florida",
      image: "../../../../assets/images/default_profile.png",
    },
    {
      title: "Smooth workflow",
      content: "One of the most outstanding tutoring sites I had worked with. Genius tutors with perfect answers. How easy it is to post my questions to the platform with no hassle at all. Smooth and fast workflow. So excited to get connected again.",
      name: "Jordan A.",
      designation: "Ohio",
      image: "../../../../assets/images/default_profile.png",
    },
    {
      title: "Fast Delivery",
      content: "Tutor MathMind is a true genius. He always finished the work far earlier than the deadline. Could complete my semester with flying colours. I never leave any feedback, but this is going to be the only exception.  The tutor literary saved my life. ",
      name: "Flynn S.",
      designation: "Belfast",
      image: "../../../../assets/images/default_profile.png",
    },
    {
      title: "Excellent Support",
      content: "I was originally skeptical because my deadline was coming up and the codes were not working, but this tutor will go above and beyond to make sure the assignment specifications are met. Absolutely best set of tutors and support team ever!! ",
      name: "Hanna B.",
      designation: "Texas",
      image: "../../../../assets/images/default_profile.png",
    },
    {
      title: "Clear Explanations",
      content: "Recommend tutetory.com to anyone who is struggling for Matlab problems. Explained the code one by when I requested. They have a genius group of tutors. I could get the help of few and all are world-class. Never hesitate to come back. Cheers!",
      name: "Ravi M.",
      designation: "Toronto",
      image: "../../../../assets/images/default_profile.png",
    },
    {
      title: "Affordable Prices",
      content: "Best tutoring site I came across. I worked with Captain and Mechanic. Both were highly concerning about timely submissions.I could get all clarifications whenever i asked. No any cost ,they were always available .Really appreciate the hard work. Most trusted tutoring  site",
      name: "Sami A.",
      designation: "London",
      image: "../../../../assets/images/default_profile.png",
    },
  ]

  tutorFeedbacks = [
    {
      description: "I’m a computer science PhD candidate and former software engineer. My expertise’s are on Databases, Algorithm, Machine Learning and Blockchain. I have industry experience in numerous programming languages which includes Python, C, C++, Java and JavaScript. Waiting to share my experience with you !!",
      image: "assets/images/expertcs.jpg",
      name: "ExpertCSTutor",
      subject: "Computer Science"
    },
    {
      description: "Masters degree holder and PhD candidate in Mechanical Engineering. Specialized in Mathematics, Fluid Dynamics and Heat flow.................................................................",
      image: "assets/images/mechanic.jpg",
      name: "Mechanic",
      subject: "Mechanical Engineering"
    },
    {
      description: "Hi, I am a passionate Electrical and Electronic Engineering graduate having a sound academic knowledge. Currently I am working as a IP Core Network Engineer in a leading telecommunication company. I provide tutoring on subjects such as IP Networking, Electrical and Power, Telecommunications, Digital Electronics, Mathematics and Physics.",
      image: "assets/images/mathmind.jpg",
      name: "MathMind",
      subject: "Electronic Engineering"
    },
    {
      description: "I am an M.Phil post graduate in Economics.. I am currently doing my PhD in Economics and the topic of my doctoral thesis is Crypto Economics. I am very much interested in helping out students online, both with their homework and tutoring them when required. My areas of specialization are Economics, business statistics and business management subjects.",
      image: "assets/images/hr.jpg",
      name: "Businesswoman ",
      subject: "Business Management"
    },
    {
      description: "Let me start by saying that I believe, teaching is a noble profession which should be done with passion. I have a good academic record and great experience in teaching in the subject Chemistry through last 5 years. I have completed my Ph.D. in 2020. I’m specialized in both organic and inorganic Chemistry.",
      image: "assets/images/h2o.jpg",
      name: "Prof. H2O",
      subject: "Chemistry"
    },
  ]

  tutorFeedbacks2 = [
    {
      description: "I’m a computer science PhD candidate and former software engineer. My expertise’s are on Databases, Algorithm, Machine Learning and Blockchain. I have industry experience in numerous programming languages which includes Python, C, C++, Java and JavaScript. Waiting to share my experience with you !!",
      image: "assets/images/expertcs.jpg",
      name: "ExpertCSTutor",
      subject: "Computer Science"
    },
    {
      description: "Masters degree holder and PhD candidate in Mechanical Engineering. Specialized in Mathematics, Fluid Dynamics and Heat flow.................................................................",
      image: "assets/images/mechanic.jpg",
      name: "Mechanic",
      subject: "Mechanical Engineering"
    },
    {
      description: "Hi, I am a passionate Electrical and Electronic Engineering graduate having a sound academic knowledge. Currently I am working as a IP Core Network Engineer in a leading telecommunication company. I provide tutoring on subjects such as IP Networking, Electrical and Power, Telecommunications, Digital Electronics, Mathematics and Physics.",
      image: "assets/images/mathmind.jpg",
      name: "MathMind",
      subject: "Electronic Engineering"
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
