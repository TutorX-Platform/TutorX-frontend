import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  rating = 0;
  review = new FormControl();
  constructor(
    private dialogRef: MatDialogRef<ReviewComponent>,
    // @ts-ignore
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.rating = data.rating;
  }

  ngOnInit(): void {
  }

  onDone() {
    this.dialogRef.close(this.review.value);
  }

}
