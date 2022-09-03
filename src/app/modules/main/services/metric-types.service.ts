import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiBase;

@Injectable({
  providedIn: 'root'
})
export class MetricTypesService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get(`${BASE_URL}/MetricTypes`)
  }

  add(data): Observable<any> {
    return this.http.post(`${BASE_URL}/MetricTypes`, data);
  }


  delete(id): Observable<any> {
    return this.http.delete(`${BASE_URL}/MetricTypes/${id}`,);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${BASE_URL}/MetricTypes/${id}`, data);
  }
}
