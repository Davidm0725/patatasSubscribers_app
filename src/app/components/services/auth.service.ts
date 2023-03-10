import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

const urlBase = environment.URL_BASE;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpHeaders: HttpHeaders;


  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  auth(serviceEndpoint: string, dataRq: any): Observable<any> {
    return this.http.post(serviceEndpoint, JSON.stringify(dataRq), { headers: this.httpHeaders });
  }
}
