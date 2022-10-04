import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {

  constructor(private Routers:Router) {}
  
  canActivate(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('token') && localStorage.getItem('roleId') == "3") {
      return true;
    }

    else {
      this.Routers.navigate(['/login']);
      return false;
    }
  }

}
