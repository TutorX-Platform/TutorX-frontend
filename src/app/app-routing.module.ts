import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './components/admin/admin.component';
import {SignInComponent} from './components/auth/sign-in/sign-in.component';
import {DummyComponent} from "./components/test/dummy/dummy.component";
import {TestChatComponent} from "./components/test/test-chat/test-chat.component";
import {NavBarComponent} from './components/home/nav-bar/nav-bar.component';
import {StudentComponent} from './components/student/student.component';
import {
  AngularFireAuthGuard,
  hasCustomClaim,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from '@angular/fire/auth-guard';
import { SignInMobileComponent } from './components/auth/sign-in-mobile/sign-in-mobile.component';
import { AddQuestionMobileComponent } from './components/shared/add-question-mobile/add-question-mobile.component';
import { TutorComponent } from './components/tutor/tutor.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {path: '', component: NavBarComponent},
  {path: 'sign-in', component: SignInMobileComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'dummy', component: DummyComponent},
  {path: 'tutor', component: TutorComponent},
  {path: 'add-question', component: AddQuestionMobileComponent},
  {path: 'test-chat/:chatToken', component: TestChatComponent},
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToHome}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
