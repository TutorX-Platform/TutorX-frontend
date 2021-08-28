import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
