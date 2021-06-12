import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit, OnDestroy {

  private mediaSub: Subscription | undefined;
  viewPoint = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver
  ) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        console.log(change.mqAlias);
        if(change.mqAlias == 'xs'){
          this.viewPoint = true;
        }else{
          this.viewPoint = false;
        }
        console.log(this.viewPoint);
      }
    );
  }

  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
    if(this.mediaSub){
      this.mediaSub.unsubscribe();
    }
  }

}
