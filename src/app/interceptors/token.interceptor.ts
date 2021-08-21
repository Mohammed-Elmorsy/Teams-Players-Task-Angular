import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn:'root'
})

export class TokenInterceptor implements HttpInterceptor{

    constructor(private auth:AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        console.log('hello from token interceptor');
        let accessToken = this.auth.getAccessToken();
    
        if(accessToken)
        {
           req = req.clone({
            setHeaders:{
              'Authorization': `Bearer ${accessToken}`
            }
          })
        }
    
          return next.handle(req);
    }

    
}