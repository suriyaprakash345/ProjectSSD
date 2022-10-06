import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()

export class HttpIntercept implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): 
    Observable<HttpEvent<any>> {
        
        const modifyReq = req.clone({
            setHeaders:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        });
     return next.handle(modifyReq);
    }
}