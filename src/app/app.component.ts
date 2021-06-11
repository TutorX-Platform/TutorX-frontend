import {Component, OnInit} from '@angular/core';
import {DummyService} from "./services/dummy.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tutorX-frontend';
  test: any;

  constructor(private dummyService: DummyService) {
  }

  ngOnInit(): void {
    this.dummyService.getTestItems().subscribe(
      (res: any) => {
        console.log(res[0].test)
        this.test = res[0].test;
      }
    );
  }
}



