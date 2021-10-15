import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, HostListener, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {AddQuestionComponent} from '../../shared/add-question/add-question.component';
import {AuthService} from "../../../services/auth.service";
import {StudentService} from "../../../services/student-service.service";
import {QuestionService} from "../../../services/question-service.service";
import {Questions} from "../../../models/questions";
import * as constants from '../../../models/constants';
import {ProgressDialogComponent} from "../../shared/progress-dialog/progress-dialog.component";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Router} from "@angular/router";
import {Attachment} from "../../../models/Attachment";
import {NotificationService} from "../../../services/notification.service";


@Component({
  selector: 'app-student-questions',
  templateUrl: './student-questions.component.html',
  styleUrls: ['./student-questions.component.scss']
})
export class StudentQuestionsComponent implements OnInit {
  contactForm!: FormGroup;
  selectedStatus = 0;
  askedQuestions: Questions[] = [];
  allAskedQuestions: Questions[] = [];
  uniqueKey = '';
  isPhysics = false;
  isMaths = false;
  isManagement = false;
  isEngineering = false;
  isCS = false;
  isEng = true;

  isOpen = false;
  isInprogress = false;
  isAssigned = false;
  isCancelled = false;
  isCompleted = false;
  attachments: Attachment[] = [];
  status: string[] = [];
  notifications = [];


  dummyProfPic = constants.dummy_profile_picture;

  subjects = constants.subjects

  states = [
    "Open", "Inprogress", "Assigned", "Cancelled", "Completed"
  ]

  sortings = constants.sortBy_functions;

  constructor(
    public authService: AuthService,
    private questionService: QuestionService,
    public studentService: StudentService,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  showFiller = false;

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      country: [null]
    });

    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(() => {
      this.getQuestions(progressDialog);

    });
    //search auto complete
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value))
    );

    this.askedQuestions.forEach(question => {
      question.attachments.forEach(attachment => {
        this.attachments.push(attachment);
      })
    })
    console.log(this.attachments, 'attachments');
    // this.getNotifications();
  }

  //search auto complete
  options: string[] = ['Maths', 'Science', 'English'];
  filteredOptions?: Observable<string[]>;
  searchControl = new FormControl();

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectStatus(num: number) {
    this.selectedStatus = num;
  }

  onFilterSelect(event: any) {
    if (event.target.value === "1: 1") {
      this.askedQuestions = this.sortQuestions(constants.sortingOrders.newestFirst, constants.sortingFields.createdDate);
    }
    if (event.target.value === "2: 2") {
      this.askedQuestions = this.sortQuestions(constants.sortingOrders.newestLast, constants.sortingFields.createdDate);
    }
    if (event.target.value === "3: 3") {
      this.askedQuestions = this.sortQuestions(constants.sortingOrders.newestFirst, constants.sortingFields.dueDate);
    }
    if (event.target.value === "4: 4") {
      this.askedQuestions = this.sortQuestions(constants.sortingOrders.newestLast, constants.sortingFields.dueDate);
    }
  }

  addQuestion() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    this.dialog.open(AddQuestionComponent, dialogConfig);
  }

  addQuestionMobile() {
    this.router.navigateByUrl('/add-question');
  }

  getQuestions(progressDialog: MatDialogRef<any>) {
    this.studentService.findStudentDetails().subscribe(
      (res) => {
        // @ts-ignore
        this.studentService.currentStudent = res;
        this.questionService.getQuestionsForStudent(this.authService.student.email).valueChanges().subscribe(
          (res) => {
            console.log(res);
            // @ts-ignore
            this.askedQuestions = res;
            // @ts-ignore
            this.allAskedQuestions = res;
            progressDialog.close();
          }, (err) => {
            console.log(err);
            progressDialog.close();
          }, () => {
            progressDialog.close();
          }
        );
      }
    )
  }

  sortQuestion() {
    return this.askedQuestions.sort(function (a, b) {
      // @ts-ignore
      return a.createdDate - b.createdDate;
    }).reverse();
  }


  sortQuestions(sortingOrder: string, sortingField: string) {
    if (sortingField === constants.sortingFields.createdDate) {
      if (sortingOrder === constants.sortingOrders.newestLast) {
        return this.askedQuestions.sort(function (a, b) {
          // @ts-ignore
          return a.createdDate - b.createdDate;
        });
      } else {
        return this.askedQuestions.sort(function (a, b) {
          // @ts-ignore
          return a.createdDate - b.createdDate;
        }).reverse()
      }
    }
    if (sortingField === constants.sortingFields.dueDate) {
      if (sortingOrder === constants.sortingOrders.newestLast) {
        return this.askedQuestions.sort(function (a, b) {
          // @ts-ignore
          return a.dueDate - b.dueDate;
        }).reverse();
      } else {
        return this.askedQuestions.sort(function (a, b) {
          // @ts-ignore
          return a.dueDate - b.dueDate;
        })
      }
    }
    return this.askedQuestions;
  }

  onSubjectFilter(value: any) {
    let filteredQuestions: Questions[] = [];

    if (value === constants.subjectCodes.mathematics) {
      this.isMaths = !this.isMaths;
    }
    if (value === constants.subjectCodes.physics) {
      this.isPhysics = !this.isPhysics;
    }
    if (value === constants.subjectCodes.management) {
      this.isManagement = !this.isManagement;
    }
    if (value === constants.subjectCodes.computer_science) {
      this.isCS = !this.isCS;
    }
    if (value === constants.subjectCodes.engineering) {
      this.isEngineering = !this.isEngineering;
    }

    if (this.isMaths) {
      filteredQuestions.push(...this.allAskedQuestions.filter(ques => ques.subjectCategory === constants.subjectCodes.mathematics));
    }
    if (this.isPhysics) {
      filteredQuestions.push(...this.allAskedQuestions.filter(ques => ques.subjectCategory === constants.subjectCodes.physics))
    }
    if (this.isCS) {
      filteredQuestions.push(...this.allAskedQuestions.filter(ques => ques.subjectCategory === constants.subjectCodes.computer_science))
    }
    if (this.isManagement) {
      filteredQuestions.push(...this.allAskedQuestions.filter(ques => ques.subjectCategory === constants.subjectCodes.management))
    }
    if (this.isEngineering) {
      filteredQuestions.push(...this.allAskedQuestions.filter(ques => ques.subjectCategory === constants.subjectCodes.engineering))
    }
    if (!this.isCancelled && !this.isAssigned && !this.isCompleted && !this.isInprogress && !this.isOpen && !this.isPhysics && !this.isManagement && !this.isCS && !this.isMaths && !this.isEngineering) {
      this.askedQuestions = [];
      this.askedQuestions.push(...this.allAskedQuestions);
    } else {
      this.askedQuestions = [];
      this.askedQuestions.push(...filteredQuestions);
    }
  }


  onStageFilter(value: any, event: any) {
    let filteredQuestions: Questions[] = [];
    if (event.checked) {
      this.status.push(value)
    } else {
      this.status.splice(this.status.indexOf(value), 1);
    }
    if (this.status.indexOf(constants.questionStatus.open) !== -1) {
      this.isOpen = true;
      filteredQuestions.push(...this.allAskedQuestions.filter(ques => ques.status === constants.questionStatus.open));
    } else {
      this.isOpen = false;
    }
    if (this.status.indexOf(constants.questionStatus.in_progress) !== -1) {
      this.isInprogress = true;
      filteredQuestions.push(...this.allAskedQuestions.filter(ques => ques.status === constants.questionStatus.in_progress));
    } else {
      this.isInprogress = false;
    }
    if (this.status.indexOf(constants.questionStatus.assigned) !== -1) {
      this.isAssigned = true;
      filteredQuestions.push(...this.allAskedQuestions.filter(ques => ques.status === constants.questionStatus.assigned));
    } else {
      this.isAssigned = false;
    }
    if (this.status.indexOf(constants.questionStatus.completed) !== -1) {
      this.isCompleted = true;
      filteredQuestions.push(...this.allAskedQuestions.filter(ques => ques.status === constants.questionStatus.completed));
    } else {
      this.isCompleted = false;
    }
    if (this.status.indexOf(constants.questionStatus.cancelled) !== -1) {
      this.isCancelled = true;
      filteredQuestions.push(...this.allAskedQuestions.filter(ques => ques.status === constants.questionStatus.cancelled));
    } else {
      this.isCancelled = false;
    }
    if (!this.isCancelled && !this.isAssigned && !this.isCompleted && !this.isInprogress && !this.isOpen && !this.isPhysics && !this.isManagement && !this.isCS && !this.isMaths) {
      this.askedQuestions = [];
      this.askedQuestions.push(...this.allAskedQuestions);
    } else {
      this.askedQuestions = [];
      this.askedQuestions.push(...filteredQuestions);
    }
  }

  onViewChat(id: any) {
    console.log(id);
    this.router.navigate([constants.routes.chat, id])
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // visible height + pixel scrolled >= total height
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      this.questionService.getNextQuestionsForStudent(this.studentService.currentStudent.email, this.allAskedQuestions[0].sort).valueChanges().subscribe(
        (res) => {
          // @ts-ignore
          this.allAskedQuestions.unshift(...res);
        }, (err) => {
          console.log(err);
        }
      )
    }
  }

  getNotifications() {
    this.notificationService.getNotifications(this.authService.student.userId).valueChanges().subscribe(
      (res) => {
        // @ts-ignore
        this.notifications = res;
      }
    )
  }

}
