import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiBase;

@Injectable({
  providedIn: 'root'
})
export class AssetTypesService {

  constructor(
    private http:HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get(`${BASE_URL}/AssetTypes`)
  }

  add(data): Observable<any> {
    return this.http.post(`${BASE_URL}/AssetTypes`, data);
  }


  delete(id): Observable<any> {
    return this.http.delete(`${BASE_URL}/AssetTypes/${id}`,);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${BASE_URL}/AssetTypes/${id}`, data);
  }

}
