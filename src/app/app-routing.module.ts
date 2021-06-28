import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import {SignInComponent} from './components/auth/sign-in/sign-in.component';
import {BodyComponent} from "./components/home/body/body.component";
import {DummyComponent} from "./components/test/dummy/dummy.component";
import { TutorDashboardComponent } from './components/tutor/tutor-dashboard/tutor-dashboard.component';
import {TestChatComponent} from "./components/test/test-chat/test-chat.component";

const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'tutor', component: TutorDashboardComponent},
  {path: 'dummy', component: DummyComponent},
  {path: 'test-chat/:chatToken', component: TestChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
