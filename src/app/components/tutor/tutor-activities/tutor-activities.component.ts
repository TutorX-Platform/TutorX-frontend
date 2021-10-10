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
import {Attachment} from "../../../models/Attachment";

@Component({
  selector: 'app-tutor-activities',
  templateUrl: './tutor-activities.component.html',
  styleUrls: ['./tutor-activities.component.scss']
})
export class TutorActivitiesComponent implements OnInit {

  contactForm!: FormGroup;
  selectedStatus = 0;
  askedQuestions: Questions[] = [];
  allAskedQuestions: Questions[] = [];
  assignedQuestions: Questions[] = [];
  inProgressQuestions: Questions[] = [];
  completedQuestions: Questions[] = [];
  cancelledQuestions: Questions[] = [];
  uniqueKey = '';
  isPhysics = false;
  isMaths = false;
  isManagement = false;
  isCS = false;
  attachments: Attachment[] = [];
  subjects = [
    "Computer Science", "Physics", "Mathematics", "Management"
  ]

  states = [
    "Open", "Inprogress", "Assigned", "Cancelled", "Completed"
  ]

  sortings = constants.sortBy_functions;

  questions = [
    {
      title: "Question Title",
      subjects: ['Maths', 'Computer Science'],
      dueDate: new Date(),
      descriptionTitle: 'Hi Tutors,',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
      status: 'inProgress',
      viewedByAmount: 400,
      images: ['../../../../assets/images/profile.jpg', '../../../../assets/images/profile.jpg', '../../../../assets/images/profile.jpg']
    },
    {
      title: "Question Title",
      subjects: ['Maths', 'Computer Science'],
      dueDate: new Date(),
      descriptionTitle: 'Hi Tutors,',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
      status: 'open',
      viewedByAmount: 400,
      images: ['../../../../assets/images/profile.jpg', '../../../../assets/images/profile.jpg', '../../../../assets/images/profile.jpg']
    }
  ]

  constructor(
    private authService: AuthService,
    private questionService: QuestionService,
    public studentService: StudentService,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
  }

  showFiller = false;

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      country: [null]
    });

    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(() => {
      this.getQuestionsTutor(progressDialog, [constants.questionStatus.open, constants.questionStatus.assigned, constants.questionStatus.in_progress, constants.questionStatus.cancelled, constants.questionStatus.completed]);
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
    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    this.selectedStatus = num;
    this.askedQuestions = this.allAskedQuestions;
    if (num === 0) {
      progressDialog.afterOpened().subscribe(() => {
        this.getQuestionsTutor(progressDialog, [constants.questionStatus.open, constants.questionStatus.assigned, constants.questionStatus.in_progress, constants.questionStatus.cancelled, constants.questionStatus.completed]);
      });
    }
    if (num === 1) {
      progressDialog.afterOpened().subscribe(() => {
        this.getQuestionsTutor(progressDialog, [constants.questionStatus.assigned]);
      });
    }
    if (num === 2) {
      progressDialog.afterOpened().subscribe(() => {
        this.getQuestionsTutor(progressDialog, [constants.questionStatus.in_progress]);
      });
    }
    if (num === 3) {
      progressDialog.afterOpened().subscribe(() => {
        this.getQuestionsTutor(progressDialog, [constants.questionStatus.completed]);
      });
    }
    if (num === 4) {
      progressDialog.afterOpened().subscribe(() => {
        this.getQuestionsTutor(progressDialog, [constants.questionStatus.cancelled]);
      });
    }
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
    dialogConfig.height = "810px";
    this.dialog.open(AddQuestionComponent, dialogConfig);
  }

  changeStatus() {
  }

  getQuestionsTutor(progressDialog: MatDialogRef<any>, status: string[]) {
    this.studentService.findStudentDetails().subscribe(
      (res) => {
        // @ts-ignore
        this.studentService.currentStudent = res;
        this.questionService.getQuestionsForTutorByStatus(this.authService.student.userId, status).valueChanges().subscribe(
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
    });
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
    if (!this.isPhysics && !this.isManagement && !this.isCS && !this.isMaths) {
      this.askedQuestions = [];
      this.askedQuestions.push(...this.allAskedQuestions);
    } else {
      this.askedQuestions = [];
      this.askedQuestions.push(...filteredQuestions);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // visible height + pixel scrolled >= total height
    let status: string = '';
    if (this.selectedStatus === 1) {
      status = constants.questionStatus.assigned
    }
    if (this.selectedStatus === 2) {
      status = constants.questionStatus.in_progress
    }
    if (this.selectedStatus === 3) {
      status = constants.questionStatus.completed
    }
    if (this.selectedStatus === 4) {
      status = constants.questionStatus.cancelled
    }
    if (this.selectedStatus === 0) {

    }
    if (window.innerHeight + Math.ceil(window.scrollY) >= document.body.scrollHeight) {
      if (this.allAskedQuestions[this.allAskedQuestions.length - 1] !== undefined) {
        this.questionService.getNextQuestionsForTutorByStatus(this.authService.student.userId, status, this.allAskedQuestions[this.allAskedQuestions.length - 1].sort).valueChanges().subscribe(
          (res) => {
            // @ts-ignore
            console.log(res);
            // @ts-ignore
            this.allAskedQuestions.push(...res);
          }
        )
      }
    }
  }
}
