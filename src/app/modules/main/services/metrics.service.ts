import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiBase;

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor(
    private http: HttpClient
  ) { }


  getMetricsGraph(assetId, metricTypeId): Observable<any> {
    return this.http.get(`${BASE_URL}/Metrics/chart/${assetId}/${metricTypeId}`)
  }

  getMetricsForecastedGraph(assetId, metricTypeId): Observable<any> {
    return this.http.get(`${BASE_URL}/Metrics/chart/forecast/${assetId}/${metricTypeId}`)
  }

}
