import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private Routers: Router) { }
  
  canActivate(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('token') && localStorage.getItem('roleId') == "2") {
      return true;
    }

    else {
      this.Routers.navigate(['/emp-login']);
      return false;
    }
  }

}

export class AuthUserGuard implements CanActivate {

  constructor(private Routers: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('token') && localStorage.getItem('roleId') == "3") {
      console.log("user permitted");
      return true;
    }

    else {
      this.Routers.navigate(['/login']);
      return false;
    }
  }

}

