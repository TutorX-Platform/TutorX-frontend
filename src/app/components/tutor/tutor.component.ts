import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, HostListener, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Question} from 'src/app/models/question';
import {Student} from 'src/app/models/student';
import {AuthService} from 'src/app/services/auth.service';
import {StudentService} from 'src/app/services/student-service.service';
import {AddQuestionComponent} from '../shared/add-question/add-question.component';
import * as constants from "../../models/constants";
import {Router} from "@angular/router";
import {ChatServiceService} from "../../services/chat-service.service";
import {Chat} from "../../models/chat";

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {

  selectedPage = 1;
  showFiller = false;
  askedQuestions: any[] = [];
  isLoading = true;
  isLoggedIn = false;

  systemName = constants.system_name;
  systemImage = constants.system_image;

  chats: Chat[] = [];

  currentStudent: Student = {
    email: "",
    firstName: "",
    isVerified: '',
    lastName: "",
    profileImage: "",
    questions: [],
    uniqueKey: "",
    userId: "",
    role: '',
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    public studentService: StudentService,
    private chatService: ChatServiceService,
    public authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findRecentChats(this.studentService.currentStudent.userId);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 1000px)'])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  changePage(num: number) {
    this.selectedPage = num;
    if (num === 1) {
      this.router.navigate([constants.routes.turor + constants.routes.questions], {skipLocationChange: true});
    } else if (num === 2) {
      this.router.navigate([constants.routes.turor + constants.routes.dashboard], {skipLocationChange: true});
    } else if (num === 3) {
      this.router.navigate([constants.routes.turor + constants.routes.activities], {skipLocationChange: true});
    } else {
      this.router.navigate([constants.routes.turor + constants.routes.payments], {skipLocationChange: true});
    }
  }

  onSignOut() {
    this.isLoggedIn = !!localStorage.getItem(constants.localStorageKeys.user);
    this.authService.onSignOut();
    this.router.navigate(['/'], {skipLocationChange: true});
  }

  onViewProfile() {
    this.router.navigate(['/tutor/profile'], {skipLocationChange: true});
  }

  findRecentChats(tutorId: string) {
    this.chatService.getChatsForTutor(tutorId).valueChanges().subscribe(
      (res) => {
        // @ts-ignore
        this.chats = res;
      }
    )
  }
}
