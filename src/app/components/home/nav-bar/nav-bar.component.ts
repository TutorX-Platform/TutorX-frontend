import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaObserver, MediaChange} from '@angular/flex-layout';
import {Subscription} from 'rxjs';
import {AuthService} from "../../../services/auth.service";

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
    private mediaObserver: MediaObserver,
    public authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        console.log(change.mqAlias);
        if (change.mqAlias == 'xs') {
          this.viewPoint = true;
        } else {
          this.viewPoint = false;
        }
        console.log(this.viewPoint);
      }
    );
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
  }

  onLogin() {
    this.authService.SignIn("sandunsameera25@gmail.com", "sandunsameera");
  }

  onSignUp() {
    this.authService.SignUp("sandunsameera25@gmail.com", "sandunsameera");
  }

}
