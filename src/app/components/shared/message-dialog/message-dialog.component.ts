import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

  title='Are you sure you want to delete!';
  message = 'Hi hello there';
  //types are success, warning, info, warning-info
  type = 'info';
  constructor(
    private dialogRef: MatDialogRef<MessageDialogComponent>,
    // @ts-ignore
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.type = data.type;
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  onButtonAction(action: string){
    this.dialogRef.close(action === 'yes');
  }

}
