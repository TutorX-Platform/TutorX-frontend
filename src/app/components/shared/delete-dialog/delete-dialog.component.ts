import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  title='Are you sure you want to delete!'
  message = 'Hi hello there'
  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    // @ts-ignore
    @Inject(MAT_DIALOG_DATA) data
    ) { }

  ngOnInit(): void {
  }

}
