import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginRegisterService } from '../common/loginRegister.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardGuard implements CanActivate {
  constructor(private service: LoginRegisterService) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.service.currentUser$.pipe(
      map(user => {
        if (user) {
          return true;
        }
        return false;
      })
    )
  }
  
}
