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

  getAllAssetOnModel(): Observable<any> {
    return this.http.get(`${BASE_URL}/Assets/onmodel`)
  }

  getAllAssetLatestMetrics(asset): Observable<any> {
    return this.http.get(`${BASE_URL}/Assets/latestmetrics/${asset}`)
  }

  add(data): Observable<any> {
    return this.http.post(`${BASE_URL}/Assets`, data);
  }


  delete(id): Observable<any> {
    return this.http.delete(`${BASE_URL}/Assets/${id}`,);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${BASE_URL}/Assets/${id}`, data);
  }

  assignAsset(data): Observable<any> {
    return this.http.post(`${BASE_URL}/Assets/assign`, data)
  }

}
