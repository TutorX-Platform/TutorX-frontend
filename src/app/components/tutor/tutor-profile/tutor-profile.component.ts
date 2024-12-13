import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {StudentService} from "../../../services/student-service.service";
import {Tutor} from "../../../models/tutor";

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss']
})
export class TutorProfileComponent implements OnInit {

  rating = 4;
  tutor: Tutor = {
    fee: 0,
    inprogressCount: 0, totalRequests: 0,
    accNo: "", bankName: "", branchName: "",
    visibleName: "",
    city: "",
    country: "",
    description: '',
    email: "",
    engagedJobs: [],
    firstName: "",
    lastName: "",
    phoneNumber: "",
    profileImage: "",
    rating: 0,
    street: "",
    subCategory: [],
    subjects: [],
    tasksCompleted: 0,
    totalEarnings: 0,
    uniqueKey: "",
    userId: "",
    postalCode: ""

  }
  countries = [
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

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getCurrentUserProfile()
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

  getCurrentUserProfile() {
    this.studentService.findStudentById(this.studentService.uid).subscribe(
      (res) => {
        // @ts-ignore
        this.tutor = res.data();
        this.tutorAddForm.controls.visibleName.setValue(this.tutor.visibleName);
        this.tutorAddForm.controls.fullName.setValue(this.tutor.firstName);
        this.tutorAddForm.controls.email.setValue(this.tutor.email);
        this.tutorAddForm.controls.street.setValue(this.tutor.street);
        this.tutorAddForm.controls.city.setValue(this.tutor.city);
        this.tutorAddForm.controls.country.setValue(this.tutor.country);
        this.tutorAddForm.controls.postalCode.setValue(this.tutor.postalCode);
        this.tutorAddForm.controls.phoneNumber.setValue(this.tutor.phoneNumber);
        this.tutorAddForm.controls.description.setValue(this.tutor.description);
        this.tutorAddForm.controls.accNo.setValue(this.tutor.accNo);
        this.tutorAddForm.controls.bankName.setValue(this.tutor.bankName);
        this.tutorAddForm.controls.branch.setValue(this.tutor.branchName);
      }
    )
  }

}
