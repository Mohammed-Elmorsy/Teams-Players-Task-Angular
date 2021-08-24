import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let role = this.auth.getUserPayLoad().role;
    console.log('role', role);

    if (this.auth.isLoggedIn() && (role === 'User' || role === 'Admin')) {
      let canAccess = new Subject<boolean>();
      return this.auth.validateToken().pipe(
        map(response => {
          if(response){
            console.log('valid token =>', response);
            return true; 
          }              
          else {
              return false;
          }
        }),
        catchError(() => {
          localStorage.removeItem('token');
          alert('A problem happened while trying to login please try to login again or call the technical support');
          this.router.navigate(['/auth/login']);
          canAccess.next(false);
          return canAccess.asObservable();
        })
      )
    }
    else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
  
}
