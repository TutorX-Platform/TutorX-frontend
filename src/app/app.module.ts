import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavBarComponent} from './components/home/nav-bar/nav-bar.component';
import {AngularFireModule} from 'angularfire2'
import {AngularFirestoreModule} from 'angularfire2/firestore'
import {AngularFireAuthModule} from 'angularfire2/auth'
import {environment} from '../environments/environment.prod';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Angular material imports
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';

import {BodyComponent} from './components/home/body/body.component';
import {AppRoutingModule} from './app-routing.module';
import {SignInComponent} from './components/auth/sign-in/sign-in.component';
import {AuthService} from "./services/auth.service";
import { DummyComponent } from './components/test/dummy/dummy.component';
import { AddQuestionComponent } from './components/shared/add-question/add-question.component';
import { TutorDashboardComponent } from './components/tutor/tutor-dashboard/tutor-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BodyComponent,
    SignInComponent,
    DummyComponent,
    AddQuestionComponent,
    TutorDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
