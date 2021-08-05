import {Component, Inject, OnInit} from '@angular/core';
// @ts-ignore
import {Elements, Element as StripeElement, ElementsOptions, StripeService} from "ngx-stripe";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DummyService} from "../../../services/dummy.service";
import {AuthService} from "../../../services/auth.service";

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
              private authService: AuthService,
              private dummyService: DummyService) {
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
                this.loading = false;
                this.submitted = false;
                // @ts-ignore
                this.paymentStatus = res['status'];
                alert("payment success");
              } else {
                console.log("err");
                alert("payment failed");
                console.log(res);
              }
            }
          )
        } else {
          console.log(result);
          console.log('result.token err');
        }
      }
    )
  }

}
