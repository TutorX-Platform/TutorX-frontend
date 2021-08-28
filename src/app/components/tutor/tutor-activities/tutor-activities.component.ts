import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
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
  attachments: string[] = [];
  subjects = [
    "Science", "English", "Maths", "Computer Science"
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
      this.getQuestionsTutor(progressDialog);
    });
    //search auto complete
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value))
    );

    this.askedQuestions.forEach(question => {
      question.attachments.forEach(attachment => {
        this.attachments.push(attachment.downloadUrl);
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
    this.selectedStatus = num;
    this.askedQuestions = this.allAskedQuestions;
    if (num === 0) {
      this.askedQuestions = this.allAskedQuestions;
    }
    if (num === 1) {
      this.assignedQuestions = [];
      this.assignedQuestions.push(...this.askedQuestions.filter(ques => ques.status === constants.questionStatus.assigned))
      this.askedQuestions = this.assignedQuestions;
    }
    if (num === 2) {
      this.inProgressQuestions = [];
      this.inProgressQuestions.push(...this.askedQuestions.filter(ques => ques.status === constants.questionStatus.in_progress))
      console.log(this.inProgressQuestions.length)
      this.askedQuestions = this.inProgressQuestions;
    }
    if (num === 3) {
      this.completedQuestions = [];
      this.completedQuestions.push(...this.askedQuestions.filter(ques => ques.status === constants.questionStatus.completed));
      this.askedQuestions = this.completedQuestions;
    }
    if (num === 4) {
      this.cancelledQuestions = [];
      this.cancelledQuestions.push(...this.askedQuestions.filter(ques => ques.status === constants.questionStatus.cancelled));
      this.askedQuestions = this.cancelledQuestions;
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

  getQuestionsTutor(progressDialog: MatDialogRef<any>) {
    this.studentService.findStudentDetails().subscribe(
      (res) => {
        // @ts-ignore
        this.studentService.currentStudent = res;
        this.questionService.getQuestionsForTutor(this.authService.student.userId).valueChanges().subscribe(
          (res) => {
            console.log(res);
            // @ts-ignore
            this.askedQuestions = res;
            this.askedQuestions = this.sortQuestion().reverse();
            // @ts-ignore
            this.allAskedQuestions = res;
            progressDialog.close();
          }, () => {
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
    let ask: Questions[] = [];
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
      this.askedQuestions.push(...this.allAskedQuestions);
    } else {
      this.askedQuestions = [];
      this.askedQuestions.push(...filteredQuestions);
    }
  }


}
