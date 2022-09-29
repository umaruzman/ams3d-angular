import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './models/classes/user';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public user:User;
  public config:any;

  constructor(private http: HttpClient) { }

  init() {
    return this.loadConfig();
  }

  public loadConfig() {
    return this.http.get('/assets/config.json')
    .toPromise()
    .then((data: any) => {
        environment.apiBase = data.apiBase;
        this.config = data;
    });
  }

  initUser(data:any):void {
    this.user = new User(data);
  }

  get apiBase() {
    if (!this.config) {
      throw Error('Config file not loaded!');
    }

    return this.config.apiBase;
  }

  removeUser():void {
    this.user = undefined;
  }

}
