import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavBarComponent} from './components/home/nav-bar/nav-bar.component';
import {AngularFireModule} from 'angularfire2'
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import {AngularFirestoreModule} from 'angularfire2/firestore'
import {AngularFireAuthModule} from 'angularfire2/auth'
import {AngularFireStorageModule} from 'angularfire2/storage'
import {environment} from '../environments/environment.prod';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NgxStripeModule} from "ngx-stripe";
import {ClipboardModule} from 'ngx-clipboard';


//Angular material imports
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';

import {NgxDropzoneModule} from 'ngx-dropzone';
import {CarouselModule} from 'ngx-owl-carousel-o';

import { DatePipe } from '@angular/common';

import {BodyComponent} from './components/home/body/body.component';
import {AppRoutingModule} from './app-routing.module';
import {SignInComponent} from './components/auth/sign-in/sign-in.component';
import {AuthService} from "./services/auth.service";
import {DummyComponent} from './components/test/dummy/dummy.component';
import {AddQuestionComponent} from './components/shared/add-question/add-question.component';
import {QuestionCardComponent} from './components/shared/question-card/question-card.component';
import {AdminComponent} from './components/admin/admin.component';
import {QuestionPoolComponent} from './components/shared/question-pool/question-pool.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {TestChatComponent} from './components/test/test-chat/test-chat.component';
import {RefundsComponent} from './components/admin/refunds/refunds.component';
import {ManageTutorsComponent} from './components/admin/manage-tutors/manage-tutors.component';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {StudentComponent} from './components/student/student.component';
import {StudentQuestionsComponent} from './components/student/student-questions/student-questions.component';
import {WelcomeComponent} from './components/student/welcome/welcome.component';
import {ProgressDialogComponent} from './components/shared/progress-dialog/progress-dialog.component';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import {SignInMobileComponent} from './components/auth/sign-in-mobile/sign-in-mobile.component';
import {SignUpMobileComponent} from './components/auth/sign-up-mobile/sign-up-mobile.component';
import {AddQuestionMobileComponent} from './components/shared/add-question-mobile/add-question-mobile.component';
import {TutorComponent} from './components/tutor/tutor.component';
import {TutorQuestionsComponent} from './components/tutor/tutor-questions/tutor-questions.component';
import {TutorDashboardComponent} from './components/tutor/tutor-dashboard/tutor-dashboard.component';

import {SlickCarouselModule} from 'ngx-slick-carousel';
import {TutorActivitiesComponent} from './components/tutor/tutor-activities/tutor-activities.component';
import {ChatComponent} from './components/shared/chat/chat.component';
import {DeleteDialogComponent} from './components/shared/delete-dialog/delete-dialog.component';
import {MessageDialogComponent} from './components/shared/message-dialog/message-dialog.component';
import {CustomDropzonePreviewComponent} from './components/test/custom-dropzone-preview/custom-dropzone-preview.component';
import {CountDownComponent} from './components/shared/count-down/count-down.component';
import {SelectMethodComponent} from './components/shared/payment-gateway/select-method/select-method.component';
import {CardDetailsComponent} from './components/shared/payment-gateway/card-details/card-details.component';
import {SuccesMessageComponent} from './components/shared/payment-gateway/succes-message/succes-message.component';
import {TutorProfileComponent} from './components/tutor/tutor-profile/tutor-profile.component';
import {TutorPaymentsComponent} from './components/tutor/tutor-payments/tutor-payments.component';
import {NotificationService} from "./services/notification.service";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BodyComponent,
    SignInComponent,
    DummyComponent,
    AddQuestionComponent,
    QuestionCardComponent,
    AdminComponent,
    QuestionPoolComponent,
    DashboardComponent,
    TestChatComponent,
    RefundsComponent,
    ManageTutorsComponent,
    SignUpComponent,
    StudentComponent,
    StudentQuestionsComponent,
    WelcomeComponent,
    ProgressDialogComponent,
    SignInMobileComponent,
    SignUpMobileComponent,
    AddQuestionMobileComponent,
    TutorComponent,
    TutorQuestionsComponent,
    TutorDashboardComponent,
    TutorActivitiesComponent,
    ChatComponent,
    DeleteDialogComponent,
    MessageDialogComponent,
    CustomDropzonePreviewComponent,
    CountDownComponent,
    SelectMethodComponent,
    CardDetailsComponent,
    SuccesMessageComponent,
    TutorProfileComponent,
    TutorPaymentsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatCardModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxDropzoneModule,
    CarouselModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatMenuModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    SlickCarouselModule,
    ClipboardModule,
    MatExpansionModule,
    NgxMatNativeDateModule,
    MatSelectModule,
    MatDatepickerModule,
    AngularFireMessagingModule,
    MatProgressBarModule,
    NgxStripeModule.forRoot('pk_test_51Ff6WELnesZei0Ur9cOUEz7QjLt8s0E56lYD2UZgM5YxUPuvXLtayH8Zj5r2cwATY7PwUoxMTjFdTRyhtqH5AXVV0044aFdUlC')
  ],
  providers: [AuthService, AngularFireAuthGuard, NotificationService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
