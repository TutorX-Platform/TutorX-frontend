import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import * as constants from "../../../../models/constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {filter} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionService} from "../../../../services/question-service.service";
import {Questions} from "../../../../models/questions";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {DummyComponent} from "../../../test/dummy/dummy.component";
// @ts-ignore
import {Elements, Element as StripeElement, ElementsOptions, StripeService} from "ngx-stripe";
import {AuthService} from "../../../../services/auth.service";
import {DummyService} from "../../../../services/dummy.service";
import {ProgressDialogComponent} from "../../progress-dialog/progress-dialog.component";
import {UtilService} from "../../../../services/util-service.service";
import * as systemMessage from '../../../../models/system-messages';
import {MailService} from "../../../../services/mail.service";
import {StudentService} from "../../../../services/student-service.service";
import {ChatServiceService} from "../../../../services/chat-service.service";
import {PaymentService} from "../../../../services/payment.service";
import {Payment} from "../../../../models/payment";

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  logo = constants.logo;
  //@ts-ignore
  form: FormGroup;
  // @ts-ignore
  questionId: string;
  // @ts-ignore
  amount: string;
  // @ts-ignore
  question: Questions;

  //@ts-ignore
  @ViewChild("first") firstElement: ElementRef;
  //@ts-ignore
  @ViewChild("second") secondElement: ElementRef;
  //@ts-ignore
  @ViewChild("third") thirdElement: ElementRef;
  //@ts-ignore
  @ViewChild("fourth") fourthElement: ElementRef;
  //@ts-ignore
  @ViewChild("cvv") cvvElement: ElementRef;
  //@ts-ignore
  @ViewChild("expiry") expiryElement: ElementRef;
  elementsOptions: ElementsOptions = {
    locale: 'en'
  }
  // @ts-ignore
  elements: Elements;
  // @ts-ignore
  card: StripeElement;
  paymentStatus: any;
  stripeData: any;
  submitted: any;
  loading: any;
  // @ts-ignore
  stripeForm: FormGroup;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              public questionService: QuestionService,
              private authService: AuthService,
              private dummyService: DummyService,
              private dialog: MatDialog,
              private stripeService: StripeService,
              private mailService: MailService,
              public router: Router,
              private paymentService: PaymentService,
              private studentService: StudentService,
              private chatService: ChatServiceService,
              private utilService: UtilService,
              // private dialogRef: MatDialogRef<CardDetailsComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: string
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.form = this.fb.group({
      first: ["", [Validators.required, Validators.maxLength(4)]],
      second: ["", [Validators.required, Validators.maxLength(4)]],
      third: ["", [Validators.required, Validators.maxLength(4)]],
      fourth: ["", [Validators.required, Validators.maxLength(4)]],
      cvv: ["", [Validators.required, Validators.maxLength(3)]],
      expiry: ["", [Validators.required, Validators.maxLength(4)]]
    });
    //@ts-ignore
    this.form.get('first').valueChanges
      .pipe(filter((value: number) => value.toString().length === 4))
      .subscribe(() => this.secondElement.nativeElement.focus());

    //@ts-ignore
    this.form.get('second').valueChanges
      .pipe(filter((value: number) => value.toString().length === 4))
      .subscribe(() => this.thirdElement.nativeElement.focus());

    //@ts-ignore
    this.form.get('third').valueChanges
      .pipe(filter((value: number) => value.toString().length === 4))
      .subscribe(() => this.fourthElement.nativeElement.focus());

    //@ts-ignore
    this.form.get('fourth').valueChanges
      .pipe(filter((value: number) => value.toString().length === 4))
      .subscribe(() => this.fourthElement.nativeElement.blur());

    // //@ts-ignore
    // this.form.get('cvv').valueChanges
    //   .pipe(filter((value: number) => value.toString().length === 3))
    //   .subscribe(() => this.cvvElement.nativeElement.blur());
    //
    // //@ts-ignore
    // this.form.get('expiry').valueChanges
    //   .pipe(filter((value: number) => value.toString().length === 4))
    //   .subscribe(() => this.expiryElement.nativeElement.blur());

    // this.questionService.getQuestionById(this.data).valueChanges().subscribe(
    //   (res) => {
    //     if (res) {
    //       this.question = res;
    //     }
    //   }
    // )

    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(
      (res) => {
        this.stripeService.elements(this.elementsOptions).subscribe(element => {
          this.elements = element;
          if (!this.card) {
            this.card = this.elements.create('card', {
              hidePostalCode: true,
              iconStyle: 'solid',
              style: {
                base: {
                  iconColor: '#666EE8',
                  color: '#31325F',
                  lineHeight: '40px',
                  fontWeight: 300,
                  fontSize: '18px',
                  className: 'custom-class-name',
                  '::placeholder': {
                    color: '#CFD7E0'
                  }
                }
              }
            });
            this.card.mount('#card-element');
          }
          progressDialog.close();
        })
      }
    )
  }

  getCardToken() {
    (<any>window).stripe.card.createToken({
      number: 424242424242,
      exp_month: 22,
      exp_year: 2026,
      cvc: 444
    }, (status: number, response: any) => {
      console.log(response)
    })
  }

  createForm() {
    this.stripeForm = this.fb.group({
      name: [''],
      amount: [''],
    })
  }

  payNow() {
    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(
      (res) => {
        this.submitted = true;
        this.loading = true;
        this.stripeData = this.stripeForm.value;
        this.stripeService.createToken(this.card, this.stripeForm.value.name).subscribe(
          (result) => {
            if (result.token) {
              const product = {
                name: this.questionService.question.questionTitle,
                price: this.questionService.question.fee,
                email: this.authService.student.email,
              }
              this.stripeData['product'] = product;
              this.stripeData['token'] = result.token;
              this.dummyService.pay(this.stripeData).subscribe(
                (res) => {
                  console.log(res);
                  // @ts-ignore
                  if (res['status'] === 200) {
                    this.paymentService.incrementPayment(this.questionService.question.fee);
                    this.studentService.incrementInprogressRequestCount(this.questionService.question.tutorId).then();
                    this.updateQuestionAsPaid();
                    this.loading = false;
                    this.submitted = false;
                    // @ts-ignore
                    this.paymentStatus = res['status'];
                    // this.dialogRef.close();
                    this.studentService.findStudentById(this.questionService.question.tutorId).subscribe(
                      (res) => {
                        // @ts-ignore
                        // this.mailService.paymentSuccessMailToTutor(res.email).subscribe();
                      }
                    )
                    this.utilService.getTimeFromTimeAPI().subscribe((res) => {
                      // @ts-ignore
                      this.recordPayment(res.time);
                      // @ts-ignore
                      this.chatService.sendPaidQuoteMessage(this.questionService.question.id, res.time, this.questionService.question.fee);
                      this.router.navigate([constants.routes.paySuccess, this.questionService.question.fee], {skipLocationChange: true});
                      progressDialog.close();
                    })

                  } else {
                    console.log("err");
                    this.dialog.closeAll();
                    // this.dialogRef.close();
                    this.utilService.openDialog(systemMessage.questionTitles.paymentFailed, systemMessage.questionMessages.paymentFailed, constants.messageTypes.warningInfo).afterOpened().subscribe();
                    console.log(res);
                  }
                }, () => {
                  this.utilService.openDialog(systemMessage.questionTitles.paymentFailed, systemMessage.questionTitles.paymentFailed, constants.messageTypes.warningInfo).afterOpened().subscribe()
                }
              )
            } else {
              // this.dialogRef.close();
              progressDialog.close();
              // @ts-ignore
              this.utilService.openDialog(result.error?.message, systemMessage.questionMessages.paymentFailed, constants.messageTypes.warningInfo).afterOpened().subscribe();
              console.log('result.token err');
            }
          }
        )
      }
    );
  }

  updateQuestionAsPaid() {
    const data = {
      isPaid: true,
      status: constants.questionStatus.in_progress,
    }
    this.questionService.updateQuestion(this.questionService.question.uniqueId, data).then(() => {
      this.questionService.incrementInProgressQuestionCount();
    });
  }

  onCancel() {
    // this.getCardToken();
  }

  recordPayment(time: number) {
    const payment: Payment = {
      month: new Date().getMonth() + 1,
      questionNumber: this.questionService.question.questionNumber,
      tutorName: this.questionService.question.tutorName,
      questionTitle: this.questionService.question.questionTitle,
      studentImage: this.questionService.question.studentImage,
      studentName: this.questionService.question.studentName,
      fee: this.questionService.question.fee,
      paidBy: this.questionService.question.studentId,
      paidCurrency: constants.usedCurrency,
      paidTime: time,
      payRefNo: "",
      payStatus: constants.payStatus.success,
      questionId: this.questionService.question.uniqueId,
      tutorId: this.questionService.question.tutorId
    }
    this.paymentService.recordPayment(payment).then((v) => {
      console.log(v);
    })
  }

}


//old one

// import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
// import * as constants from "../../../../models/constants";
// import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// import {filter} from "rxjs/operators";
// import {ActivatedRoute, Router} from "@angular/router";
// import {QuestionService} from "../../../../services/question-service.service";
// import {Questions} from "../../../../models/questions";
// import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
// import {DummyComponent} from "../../../test/dummy/dummy.component";
// // @ts-ignore
// import {Elements, Element as StripeElement, ElementsOptions, StripeService} from "ngx-stripe";
// import {AuthService} from "../../../../services/auth.service";
// import {DummyService} from "../../../../services/dummy.service";
// import {ProgressDialogComponent} from "../../progress-dialog/progress-dialog.component";
// import {UtilService} from "../../../../services/util-service.service";
// import * as systemMessage from '../../../../models/system-messages';
// import {MailService} from "../../../../services/mail.service";
// import {StudentService} from "../../../../services/student-service.service";
// import {ChatServiceService} from "../../../../services/chat-service.service";
// import {PaymentService} from "../../../../services/payment.service";
// import {Payment} from "../../../../models/payment";
//
// @Component({
//   selector: 'app-card-details',
//   templateUrl: './card-details.component.html',
//   styleUrls: ['./card-details.component.scss']
// })
// export class CardDetailsComponent implements OnInit {
//
//   logo = constants.logo;
//   //@ts-ignore
//   form: FormGroup;
//   // @ts-ignore
//   questionId: string;
//   // @ts-ignore
//   amount: string;
//   // @ts-ignore
//   question: Questions;
//
//   //@ts-ignore
//   @ViewChild("first") firstElement: ElementRef;
//   //@ts-ignore
//   @ViewChild("second") secondElement: ElementRef;
//   //@ts-ignore
//   @ViewChild("third") thirdElement: ElementRef;
//   //@ts-ignore
//   @ViewChild("fourth") fourthElement: ElementRef;
//   //@ts-ignore
//   @ViewChild("cvv") cvvElement: ElementRef;
//   //@ts-ignore
//   @ViewChild("expiry") expiryElement: ElementRef;
//   elementsOptions: ElementsOptions = {
//     locale: 'en'
//   }
//   // @ts-ignore
//   elements: Elements;
//   // @ts-ignore
//   card: StripeElement;
//   paymentStatus: any;
//   stripeData: any;
//   submitted: any;
//   loading: any;
//   // @ts-ignore
//   stripeForm: FormGroup;
//
//   constructor(private fb: FormBuilder,
//               private activatedRoute: ActivatedRoute,
//               private questionService: QuestionService,
//               private authService: AuthService,
//               private dummyService: DummyService,
//               private dialog: MatDialog,
//               private stripeService: StripeService,
//               private mailService: MailService,
//               public router: Router,
//               private paymentService: PaymentService,
//               private studentService: StudentService,
//               private chatService: ChatServiceService,
//               private utilService: UtilService,
//               private dialogRef: MatDialogRef<CardDetailsComponent>,
//               @Inject(MAT_DIALOG_DATA) public data: string
//   ) {
//   }
//
//   ngOnInit() {
//     this.createForm();
//     this.form = this.fb.group({
//       first: ["", [Validators.required, Validators.maxLength(4)]],
//       second: ["", [Validators.required, Validators.maxLength(4)]],
//       third: ["", [Validators.required, Validators.maxLength(4)]],
//       fourth: ["", [Validators.required, Validators.maxLength(4)]],
//       cvv: ["", [Validators.required, Validators.maxLength(3)]],
//       expiry: ["", [Validators.required, Validators.maxLength(4)]]
//     });
//     //@ts-ignore
//     this.form.get('first').valueChanges
//       .pipe(filter((value: number) => value.toString().length === 4))
//       .subscribe(() => this.secondElement.nativeElement.focus());
//
//     //@ts-ignore
//     this.form.get('second').valueChanges
//       .pipe(filter((value: number) => value.toString().length === 4))
//       .subscribe(() => this.thirdElement.nativeElement.focus());
//
//     //@ts-ignore
//     this.form.get('third').valueChanges
//       .pipe(filter((value: number) => value.toString().length === 4))
//       .subscribe(() => this.fourthElement.nativeElement.focus());
//
//     //@ts-ignore
//     this.form.get('fourth').valueChanges
//       .pipe(filter((value: number) => value.toString().length === 4))
//       .subscribe(() => this.fourthElement.nativeElement.blur());
//
//     // //@ts-ignore
//     // this.form.get('cvv').valueChanges
//     //   .pipe(filter((value: number) => value.toString().length === 3))
//     //   .subscribe(() => this.cvvElement.nativeElement.blur());
//     //
//     // //@ts-ignore
//     // this.form.get('expiry').valueChanges
//     //   .pipe(filter((value: number) => value.toString().length === 4))
//     //   .subscribe(() => this.expiryElement.nativeElement.blur());
//
//     this.questionService.getQuestionById(this.data).valueChanges().subscribe(
//       (res) => {
//         if (res) {
//           this.question = res;
//         }
//       }
//     )
//
//     const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
//     progressDialog.afterOpened().subscribe(
//       (res) => {
//         this.stripeService.elements(this.elementsOptions).subscribe(element => {
//           this.elements = element;
//           if (!this.card) {
//             this.card = this.elements.create('card', {
//               hidePostalCode: true,
//               iconStyle: 'solid',
//               style: {
//                 base: {
//                   iconColor: '#666EE8',
//                   color: '#31325F',
//                   lineHeight: '40px',
//                   fontWeight: 300,
//                   fontSize: '18px',
//                   className: 'custom-class-name',
//                   '::placeholder': {
//                     color: '#CFD7E0'
//                   }
//                 }
//               }
//             });
//             this.card.mount('#card-element');
//           }
//           progressDialog.close();
//         })
//       }
//     )
//   }
//
//   getCardToken() {
//     (<any>window).stripe.card.createToken({
//       number: 424242424242,
//       exp_month: 22,
//       exp_year: 2026,
//       cvc: 444
//     }, (status: number, response: any) => {
//       console.log(response)
//     })
//   }
//
//   createForm() {
//     this.stripeForm = this.fb.group({
//       name: [''],
//       amount: [''],
//     })
//   }
//
//   payNow() {
//     console.log(this.card.StripeElement);
//     const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
//     progressDialog.afterOpened().subscribe(
//       (res) => {
//         this.submitted = true;
//         this.loading = true;
//         this.stripeData = this.stripeForm.value;
//         this.stripeService.createToken(this.card, this.stripeForm.value.name).subscribe(
//           (result) => {
//             if (result.token) {
//               const product = {
//                 name: this.questionService.question.questionTitle,
//                 price: this.questionService.question.fee,
//                 email: this.authService.student.email,
//               }
//               this.stripeData['product'] = product;
//               this.stripeData['token'] = result.token;
//               this.dummyService.pay(this.stripeData).subscribe(
//                 (res) => {
//                   console.log(res);
//                   // @ts-ignore
//                   if (res['status'] === 200) {
//                     this.paymentService.incrementPayment(this.question.fee);
//                     this.updateQuestionAsPaid();
//                     this.loading = false;
//                     this.submitted = false;
//                     // @ts-ignore
//                     this.paymentStatus = res['status'];
//                     this.dialogRef.close();
//                     this.studentService.findStudentById(this.questionService.question.tutorId).subscribe(
//                       (res) => {
//                         // @ts-ignore
//                         // this.mailService.paymentSuccessMailToTutor(res.email).subscribe();
//                       }
//                     )
//                     this.utilService.getTimeFromTimeAPI().subscribe((res) => {
//                       // @ts-ignore
//                       this.recordPayment(res.time);
//                       // @ts-ignore
//                       this.chatService.sendPaidQuoteMessage(this.question.id, res.time, this.question.fee);
//                       this.router.navigate([constants.routes.paySuccess, this.questionService.question.fee], {skipLocationChange: true});
//                       progressDialog.close();
//                     })
//
//                   } else {
//                     console.log("err");
//                     this.dialog.closeAll();
//                     this.dialogRef.close();
//                     this.utilService.openDialog(systemMessage.questionTitles.paymentFailed, systemMessage.questionMessages.paymentFailed, constants.messageTypes.warningInfo).afterOpened().subscribe();
//                     console.log(res);
//                   }
//                 }, () => {
//                   this.utilService.openDialog(systemMessage.questionTitles.paymentFailed, systemMessage.questionTitles.paymentFailed, constants.messageTypes.warningInfo).afterOpened().subscribe()
//                 }
//               )
//             } else {
//               this.dialogRef.close();
//               progressDialog.close();
//               // @ts-ignore
//               this.utilService.openDialog(result.error?.message, systemMessage.questionMessages.paymentFailed, constants.messageTypes.warningInfo).afterOpened().subscribe();
//               console.log('result.token err');
//             }
//           }
//         )
//       }
//     );
//   }
//
//   updateQuestionAsPaid() {
//     const data = {
//       isPaid: true,
//       status: constants.questionStatus.in_progress,
//     }
//     this.questionService.updateQuestion(this.data, data);
//     this.questionService.incrementInProgressQuestionCount();
//   }
//
//   onCancel() {
//     this.dialogRef.close();
//     // this.getCardToken();
//   }
//
//   recordPayment(time: number) {
//     const payment: Payment = {
//       month: new Date().getMonth() + 1,
//       questionNumber: this.questionService.question.questionNumber,
//       tutorName: this.questionService.question.tutorName,
//       questionTitle: this.question.questionTitle,
//       studentImage: this.question.studentImage,
//       studentName: this.question.studentName,
//       fee: this.question.fee,
//       paidBy: this.question.studentId,
//       paidCurrency: constants.usedCurrency,
//       paidTime: time,
//       payRefNo: "",
//       payStatus: constants.payStatus.success,
//       questionId: this.question.uniqueId,
//       tutorId: this.question.tutorId
//     }
//     this.paymentService.recordPayment(payment).then((v) => {
//       console.log(v);
//     })
//   }
//
// }
