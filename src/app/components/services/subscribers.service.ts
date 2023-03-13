import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  createSubscribers(serviceEndpoint: string, dataRq: any): Observable<any> {
    return this.http.post(serviceEndpoint, JSON.stringify({ "Subscribers": [dataRq] }), { headers: this.httpHeaders });
  }

  deleteSubscribers(serviceEndpoint: string): Observable<any> {
    return this.http.delete(serviceEndpoint, { headers: this.httpHeaders });
  }


  updateSubscribers(serviceEndpoint: string, dataRq: any): Observable<any> {
    return this.http.put(serviceEndpoint+`${dataRq.Id}`, JSON.stringify(dataRq), { headers: this.httpHeaders });
  }

  getCountries(serviceEndpoint: string, dataRq: any): Observable<any> {
    return this.http.get(serviceEndpoint, dataRq);
  }

}
