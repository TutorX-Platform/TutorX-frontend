import { Component, OnInit } from '@angular/core';
import { NgxDropzonePreviewComponent } from 'ngx-dropzone';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'custom-dropzone-preview',
  templateUrl: './custom-dropzone-preview.component.html',
  styleUrls: ['./custom-dropzone-preview.component.scss'],
  providers: [
    {
      provide: NgxDropzonePreviewComponent,
      useExisting: CustomDropzonePreviewComponent
    }
  ]
})
export class CustomDropzonePreviewComponent extends NgxDropzonePreviewComponent implements OnInit {

  constructor(
    sanitizer: DomSanitizer
  ) {
    super(sanitizer);
  }

  ngOnInit() {
    if (!this.file) {
      console.error('No file to read. Please provide a file using the [file] Input property.');
      return;
    }

    console.log(this.file);
  }
}

