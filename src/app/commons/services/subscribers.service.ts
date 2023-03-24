import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  private http = inject(HttpClient)
  constructor() { }

  getSubscribers(serviceEndpoint: string, dataRq: any): Observable<any> {
    return this.http.get(
      serviceEndpoint + `?page=${dataRq.page}&count=${dataRq.count}&sortType=${dataRq.sortType}`);
  }

  createSubscribers(serviceEndpoint: string, dataRq: any): Observable<any> {
    return this.http.post(serviceEndpoint, JSON.stringify({ "Subscribers": [dataRq] }));
  }

  deleteSubscribers(serviceEndpoint: string): Observable<any> {
    return this.http.delete(serviceEndpoint);
  }


  updateSubscribers(serviceEndpoint: string, dataRq: any): Observable<any> {
    return this.http.put(serviceEndpoint+`${dataRq.Id}`, JSON.stringify(dataRq));
  }

  getCountries(serviceEndpoint: string, dataRq: any): Observable<any> {
    return this.http.get(serviceEndpoint, dataRq);
  }

}
