import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as constants from "../../../../models/constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  logo = constants.logo;
  //@ts-ignore
  form: FormGroup;

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
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
  }

}
