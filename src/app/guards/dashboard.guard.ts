import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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
      return this.auth.validateToken().pipe(
        map(response => {
          if(response){
            console.log('valid token =>', response);
            return true; 
          }              
          else {
              throw 'error';
          }
        }),
        catchError(err => {
          console.log('invalid token '+ err);
          this.auth.logout().subscribe(res => {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          })
          throw 'error';
          
        }),
      )
      return false;

    }
    else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
  
}
