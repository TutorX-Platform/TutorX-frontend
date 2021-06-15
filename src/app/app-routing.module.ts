import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './components/auth/sign-in/sign-in.component';
import {BodyComponent} from "./components/home/body/body.component";
import {DummyComponent} from "./components/test/dummy/dummy.component";

const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'dummy', component: DummyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
