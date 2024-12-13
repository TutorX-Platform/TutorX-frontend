import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-tutors',
  templateUrl: './manage-tutors.component.html',
  styleUrls: ['./manage-tutors.component.scss']
})
export class ManageTutorsComponent implements OnInit {
  constructor(
    private fb:FormBuilder
  ) { }

  contactForm!: FormGroup;
  rating = 3;

  numbers = [1,2,3];
  countries = [
    { id: 1, name: "United States" },
    { id: 2, name: "Australia" },
    { id: 3, name: "Canada" },
    { id: 4, name: "Brazil" },
    { id: 5, name: "England" }
  ];

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      country: [null]
    });
  }
}
