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

    if (localStorage.getItem('token') && localStorage.getItem('roleId') == "2"){
      console.log("permited");
      return true;
    }
    else {
      console.log("not permitted");
      
      this.Routers.navigate(['/emp-login']);
      return false
    }
  }

}
