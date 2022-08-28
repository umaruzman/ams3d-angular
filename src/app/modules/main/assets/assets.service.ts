import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiBase;

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(
    private http:HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get(`${BASE_URL}/Assets`)
  }


}
