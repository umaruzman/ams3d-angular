import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { AppService } from "../app.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private app: AppService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.startsWith('https://api.bim.ziphio.com:9233/') && !req.url.includes("manifest.json") && !req.headers.has('Authorization'))
            return next.handle(req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.app.user?.token}`
                }
            }));
        else
            return next.handle(req);
    }
}