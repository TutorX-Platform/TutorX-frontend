import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import * as constants from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log(this.authService.getAuthenticated());
    if (this.authService.getAuthenticated() === null) {
      console.log("fal")
      this.router.navigate(['/home'],{skipLocationChange: true})
      return false;
    } else {
      return true;
    }
  }

}
