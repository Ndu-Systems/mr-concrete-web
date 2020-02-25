import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountService } from '../_services';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private routeTo: Router,
    private accountService: AccountService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.accountService.CurrentUserValue;
    if (!currentUser) {
      this.routeTo.navigate(['/sign-in'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    // authorized
    return true;
  }
}
