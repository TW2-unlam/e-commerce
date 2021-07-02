import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}
  login(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/auth/login`, data);
  }

  signup(data:any):Observable<any> {
    return this.http.post(`${apiUrl}/auth/signUp`, data)
  }
}
