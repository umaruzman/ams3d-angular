import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private config: AppService,
    private router: Router
  ) { 
    this.getUser();
  }

  public getUser() {
    try{
      if (!this.config.user && isPlatformBrowser(this.platformId)){
        let user = JSON.parse(sessionStorage.getItem('ams3d-auth'));

        if (user)
          this.config.initUser(user);
      }
    }
    catch (e){
      console.log(e);
    }
    finally{
      return this.config.user;
    }
  }

  public login(uname:string,pwd:string): Observable<boolean> {
    let url = `${this.config.apiBase}/auth`;

    return new Observable<boolean>(observer => {
      this.http.post(url,{
        username: uname,
        password: pwd
      })
        .subscribe(
          (res:any) => {
            this.config.initUser(res);

            if (isPlatformBrowser(this.platformId)) {
              sessionStorage.setItem('ams3d-auth',JSON.stringify(res));
            }
            observer.next(true);
          },
          (err:Error) => observer.error(err)
        )
    });
  }

  logout() {
    if (isPlatformBrowser(this.platformId)){
      sessionStorage.removeItem("ams3d-auth");
    }
    this.config.removeUser();
    this.router.navigate(['/auth.login']);
  }

  public isAuthenticated(url):Observable<boolean> {
    return new Observable<boolean>(ob=>{
      ob.next(this.config.user != undefined);
    }) 
  }

}
