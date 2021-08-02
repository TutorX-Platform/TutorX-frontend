import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  // @ts-ignore
  @ViewChild('scrollMe') private myScroll: ElementRef;
  message = new FormControl('');
  messages:any = [];
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onSend(){
    this.messages.push(this.message.value);
    this.message.reset();
  }

  scrollToBottom(): void {
    try {
      this.myScroll.nativeElement.scrollTop = this.myScroll.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
