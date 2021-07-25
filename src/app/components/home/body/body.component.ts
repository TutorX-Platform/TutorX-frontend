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
    // trigger('carouselAnimation', [
    //   transition('void => *', [
    //     style({ opacity: 0 }),
    //     animate('300ms', style({ opacity: 1 }))
    //   ]),
    //   transition('* => void', [
    //     animate('300ms', style({ opacity: 0 }))
    //   ])
    // ])
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
      transition('show => hide', animate('400ms ease-out')),
      transition('hide => show', animate('400ms ease-in'))
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
  feedBackNum = 3;
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

  slides = [
    {img: "https://via.placeholder.com/600.png/09f/fff"},
    {img: "https://via.placeholder.com/600.png/021/fff"},
    {img: "https://via.placeholder.com/600.png/321/fff"},
    {img: "https://via.placeholder.com/600.png/422/fff"},
    {img: "https://via.placeholder.com/600.png/654/fff"}
  ];
  slideConfig = {
    slidesToShow:2,
    dots: true,
    arrows: false,
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
    {title:"User Friendly", description:"Responsive and easy to navigate interfaces",imageUrl:"../../../../assets/icons/02.svg"},
    {title:"Step by step explanations", description:"We break it down for you",imageUrl:"../../../../assets/icons/03.svg"},
    {title:"Clean and Correct Answers", description:"We provide accurate and original answers",imageUrl:"../../../../assets/icons/04.svg"},
    {title:"Fast Response", description:"Instant responses from the tutors 24/7",imageUrl:"../../../../assets/icons/05.svg"},
    {title:"Affordable Service", description:"Reasonable quotes based on your requirements. ",imageUrl:"../../../../assets/icons/01.svg"}
  ]

  feedback = [
    {
      title1: "Incredible Experience",
      title2: "Dependable, Responsive, Professional Partner",
      content1: "We had an incredible experience working with Landify and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the concept so quickly. It acted as a catalyst to take our design to the next level and get more eyes on our product.",
      content2: "Fermin Apps has collaborated with Landify team for several projects such as Photo Sharing Apps and Custom Social Networking Apps. The experience has been pleasant, professional and exceeding our expectations. The team is always thinking beyond the current tasks & helps us formulate a vision and possibilities for future.",
      name1: "Jane Cooper",
      name2: "Jane Cooper",
      designation1: "CEO, ABC Corporation",
      designation2: "CEO, ABC Corporation",
      image1: "../../../../assets/images/profile.jpg",
      image2: "../../../../assets/images/profile.jpg"
    },
    {
      title1: "Very Helpfull",
      title2: "Highly Appreceated",
      content1: "We had an incredible experience working with Landify and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the concept so quickly. It acted as a catalyst to take our design to the next level and get more eyes on our product.",
      content2: "Fermin Apps has collaborated with Landify team for several projects such as Photo Sharing Apps and Custom Social Networking Apps. The experience has been pleasant, professional and exceeding our expectations. The team is always thinking beyond the current tasks & helps us formulate a vision and possibilities for future.",
      name1: "Jane Cooper",
      name2: "Jane Cooper",
      designation1: "CEO, ABC Corporation",
      designation2: "CEO, ABC Corporation",
      image1: "../../../../assets/images/profile.jpg",
      image2: "../../../../assets/images/profile.jpg"
    },
    {
      title1: "Incredible Experience",
      title2: "Dependable, Responsive, Professional Partner",
      content1: "We had an incredible experience working with Landify and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the concept so quickly. It acted as a catalyst to take our design to the next level and get more eyes on our product.",
      content2: "Fermin Apps has collaborated with Landify team for several projects such as Photo Sharing Apps and Custom Social Networking Apps. The experience has been pleasant, professional and exceeding our expectations. The team is always thinking beyond the current tasks & helps us formulate a vision and possibilities for future.",
      name1: "Jane Cooper",
      name2: "Jane Cooper",
      designation1: "CEO, ABC Corporation",
      designation2: "CEO, ABC Corporation",
      image1: "../../../../assets/images/profile.jpg",
      image2: "../../../../assets/images/profile.jpg"
    }
  ]

  tutorFeedbacks = [1, 2, 3, 4, 5]

  tutorFeedbacks2 = [1, 2, 3]

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
    this.dialog.open(AddQuestionComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe(
      () => {
        if (this.authService.isLoggedIn) {
          this.router.navigate([constants.routes.student_q_pool]);
        }
      }
    )
  }


}
