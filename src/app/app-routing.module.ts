import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './components/admin/admin.component';
import {DummyComponent} from "./components/test/dummy/dummy.component";
import {TestChatComponent} from "./components/test/test-chat/test-chat.component";
import {StudentComponent} from './components/student/student.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import {SignInMobileComponent} from './components/auth/sign-in-mobile/sign-in-mobile.component';
import {AddQuestionMobileComponent} from './components/shared/add-question-mobile/add-question-mobile.component';
import {TutorComponent} from './components/tutor/tutor.component';
import {ChatComponent} from "./components/shared/chat/chat.component";
import {CardDetailsComponent} from "./components/shared/payment-gateway/card-details/card-details.component";
import {SuccesMessageComponent} from "./components/shared/payment-gateway/succes-message/succes-message.component";
import {StudentQuestionsComponent} from "./components/student/student-questions/student-questions.component";
import {TutorQuestionsComponent} from "./components/tutor/tutor-questions/tutor-questions.component";
import {TutorDashboardComponent} from "./components/tutor/tutor-dashboard/tutor-dashboard.component";
import {TutorActivitiesComponent} from "./components/tutor/tutor-activities/tutor-activities.component";
import {TutorProfileComponent} from "./components/tutor/tutor-profile/tutor-profile.component";
import {TutorPaymentsComponent} from "./components/tutor/tutor-payments/tutor-payments.component";
import {BodyComponent} from './components/home/body/body.component';
import {HOME} from "@angular/cdk/keycodes";
import {NonAuthChatComponent} from "./components/shared/non-auth-chat/non-auth-chat.component";

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['home']);

const routes: Routes = [
  {path: 'home', component: BodyComponent},
  {path: 'sign-in', component: SignInMobileComponent},
  {path: 'dummy', component: DummyComponent},
  {path: 'temp', component: SuccesMessageComponent},
  {path: 'pay/:id/:amount', component: CardDetailsComponent},
  {path: 'pay-success/:amount', component: SuccesMessageComponent},
  {
    path: 'tutor', component: TutorComponent, canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToHome},
    children: [
      {
        path: 'dashboard',
        component: TutorDashboardComponent
      },
      {
        path: 'questions',
        component: TutorQuestionsComponent
      },
      {
        path: 'activities',
        component: TutorActivitiesComponent
      },
      {
        path: 'chat/:id',
        component: ChatComponent
      },
      {
        path: 'profile',
        component: TutorProfileComponent
      },
      {
        path: 'payments',
        component: TutorPaymentsComponent
      },
      {
        path: '',
        redirectTo: 'tutor/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {path: 'add-question', component: AddQuestionMobileComponent},
  {path: 'test-chat/:id', component: TestChatComponent},
  {path: 'chat/:id', component: ChatComponent},
  {
    path: 'student',
    component: StudentComponent,
    // canActivate: [AngularFireAuthGuard],
    children: [
      {
        path: 'questions',
        component: StudentQuestionsComponent,
        // data: {authGuardPipe: redirectUnauthorizedToHome},
      },
      {
        path: 'chat/:id',
        component: ChatComponent
      },
      {
        path: '',
        redirectTo: 'student/questions',
        pathMatch: 'full',
        // data: {authGuardPipe: redirectUnauthorizedToHome},

      },
      {
        path: '**',
        redirectTo: 'student/questions',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: 'non-auth', component: NonAuthChatComponent,
    // canActivate: [AngularFireAuthGuard],
    // data: {authGuardPipe: redirectUnauthorizedToHome},
    children: [
      {
        path: 'chat/:id',
        component: ChatComponent
      }
     ]
  },
  {path: '', component: BodyComponent},
  {path: '**', component: BodyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
