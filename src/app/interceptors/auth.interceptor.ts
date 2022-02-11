// auth.interceptor.ts

// A useful walkthrough for implementing HTTP interceptors found at
// https://malcoded.com/posts/angular-json-web-token/
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'  
import { Observable } from 'rxjs'
  
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    // intercept requests and add auth header to request
    intercept( req: HttpRequest<any>, next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token')
        // if token defined, clone the request and add an authorization header
        if (token) {
            const cloneReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token),
            })
            return next.handle(cloneReq)
        // if no token defined skip adding auth header, move to next http handler
        } else {
            return next.handle(req)
        }
    }
}