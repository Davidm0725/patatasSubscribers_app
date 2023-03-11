import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('Token')}`
    });
  }

  getSubscribers(serviceEndpoint: string, dataRq: any): Observable<any> {
    return this.http.get(
      serviceEndpoint + `?page=${dataRq.page}&count=${dataRq.count}&sortType=${dataRq.sortType}`,
      { headers: this.httpHeaders });
  }

  deleteSubscribers(serviceEndpoint: string): Observable<any> {
    return this.http.delete(serviceEndpoint, { headers: this.httpHeaders });
  }

}
