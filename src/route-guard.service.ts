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

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  // @ts-ignore
  currentUser: Student;

  constructor(private authService: AuthService,
              private studentService: StudentService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.currentUser = this.studentService.currentStudent;
    console.log('Route guard started');
    console.log(this.currentUser);
    if (this.currentUser === null) {
      this.router.navigate(['/home']);
      return false;
    } else {
      if (next.data.type.includes(this.currentUser.role)) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }
  }

}
