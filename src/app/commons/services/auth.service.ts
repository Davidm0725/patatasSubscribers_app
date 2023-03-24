import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
const urlBase = environment.URL_BASE;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() { }

  auth(serviceEndpoint: string, dataRq: any): Observable<any> {
    return this.http.post(serviceEndpoint, JSON.stringify(dataRq));
  }

  getToken() {
    return localStorage.getItem('Token');
  }
}
