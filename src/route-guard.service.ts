import { AuthService } from './app/services/auth.service';
import { StudentService } from './app/services/student-service.service';
import { User } from './app/models/user';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import {Student} from "./app/models/student";
import * as constants from "./app/models/constants";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  // @ts-ignore
  userRole: string;
  currentUser = null;

  constructor(private authService: AuthService,
              private angularFireAuth: AngularFireAuth,
              private studentService: StudentService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // @ts-ignore
    this.currentUser = this.authService.student;
    if (this.currentUser === null) {
      this.router.navigate(['/home']);
      return false;
    } else {
      // @ts-ignore
      if (next.data.type.includes(localStorage.getItem(constants.localStorageKeys.role))) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }
  }

}
