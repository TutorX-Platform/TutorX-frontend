import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AddQuestionComponent } from '../shared/add-question/add-question.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  selectedPage = 1;
  showFiller = false;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 1000px)'])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  changePage(num:number){
    this.selectedPage = num;
  }  

  addQuestion(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.height = "810px";
    this.dialog.open(AddQuestionComponent, dialogConfig);
  }
}
