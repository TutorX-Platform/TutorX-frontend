import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss']
})
export class TutorProfileComponent implements OnInit {

  rating = 4;
  countries=[
    {
      id: 1,
      name: 'Sri Lanka'
    },
    {
      id: 2,
      name: 'India'
    }
  ]

  // @ts-ignore
  tutorAddForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.tutorAddForm = new FormGroup({
      visibleName: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      street: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      postalCode: new FormControl(''),
      // password: new FormControl('', Validators.required),
      // confirmPassword: new FormControl('', Validators.required),
      // subjectList1: new FormControl('', Validators.required),
      // subjectList2: new FormControl(''),
      // subjectList3: new FormControl(''),
      // subjectList4: new FormControl(''),
      // subjectList5: new FormControl(''),
      // subjectSubCategoryList1: new FormControl('', Validators.required),
      // subjectSubCategoryList2: new FormControl(''),
      // subjectSubCategoryList3: new FormControl(''),
      // subjectSubCategoryList4: new FormControl(''),
      // subjectSubCategoryList5: new FormControl(''),
      bankName: new FormControl(''),
      branch: new FormControl(''),
      accNo: new FormControl(''),
    });
  }

}
