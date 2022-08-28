import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  init() {
    return this.loadConfig();
  }

  public loadConfig() {
    return this.http.get('/assets/config.json')
    .toPromise()
    .then((data: any) => {
        environment.apiBase = data.apiBase;
    });
  }


}
