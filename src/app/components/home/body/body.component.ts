import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  details = [
    {title:"Robust workflow", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum"},
    {title:"Flexibility", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum"},
    {title:"User friendly", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum"},
    {title:"Robust workflow", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum"},
    {title:"Flexibility", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum"},
    {title:"User friendly", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum"}
  ]

}
