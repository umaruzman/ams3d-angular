import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewerService {

  constructor(
    private http: HttpClient
  ) { }

  public getManifest(svfLocation:String): Observable<any> {
    let maniLoc = svfLocation.split('Resource')[0] + 'Resource/manifest.json';
    return this.http.get(maniLoc);
  }
}
