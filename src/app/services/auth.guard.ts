import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
      private router: Router,
      private authenticationService: AuthService) {}

  public canActivate() {
      const isUserSignedUpIn = this.authenticationService.isSignedUp();
      if (isUserSignedUpIn) {
          return true;
      }
      this.router.navigate(['/login']);
      return false;
  }

}