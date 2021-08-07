import {Component, Inject, OnInit} from '@angular/core';
// @ts-ignore
import {Elements, Element as StripeElement, ElementsOptions, StripeService} from "ngx-stripe";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DummyService} from "../../../services/dummy.service";
import {AuthService} from "../../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QuestionService} from "../../../services/question-service.service";

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {
  // @ts-ignore
  elements: Elements;
  // @ts-ignore
  card: StripeElement;
  paymentStatus: any;
  stripeData: any;
  submitted: any;
  loading: any;

  elementsOptions: ElementsOptions = {
    locale: 'en'
  }

  // @ts-ignore
  stripeForm: FormGroup;

  constructor(private stripeService: StripeService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<DummyComponent>,
              private authService: AuthService,
              private dummyService: DummyService,
              private questionService: QuestionService,
              @Inject(MAT_DIALOG_DATA) public data: string) {
  }

  ngOnInit(): void {

    this.loading = false;
    this.createForm();

    this.stripeService.elements(this.elementsOptions).subscribe(element => {
      this.elements = element;

      if (!this.card) {
        this.card = this.elements.create('card', {
          iconStyle: 'solid',
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontSize: '18px',
              '::placeholder': {
                color: '#CFD7E0'
              }
            }
          }
        });
        this.card.mount('#card-element')
      }
    })
  }

  createForm() {
    this.stripeForm = this.fb.group({
      name: [''],
      amount: [''],
    })
  }

  buy() {
    this.submitted = true;
    this.loading = true;
    this.stripeData = this.stripeForm.value;
    this.stripeService.createToken(this.card, this.stripeForm.value.name).subscribe(
      (result) => {
        if (result.token) {
          console.log(result.token);
          const product = {
            name: "sandun question",
            price: 1000,
            email: this.authService.student.email,
          }
          this.stripeData['product'] = product;
          this.stripeData['token'] = result.token;
          this.dummyService.pay(this.stripeData).subscribe(
            (res) => {
              console.log(res);
              // @ts-ignore
              if (res['status'] === 200) {
                this.updateQuestionAsPaid();
                this.loading = false;
                this.submitted = false;
                // @ts-ignore
                this.paymentStatus = res['status'];
                alert("payment success");
                this.dialogRef.close("payment success");

              } else {
                console.log("err");
                alert("payment failed");
                console.log(res);
                this.dialogRef.close("payment failed");
              }
            }
          )
        } else {
          // @ts-ignore
          alert(result.error?.message)
          console.log(result);
          console.log('result.token err');
        }
      }
    )
  }


  updateQuestionAsPaid() {
    const data = {
      isPaid: true,
    }
    this.questionService.updateQuestion(this.data, data);
  }

}
