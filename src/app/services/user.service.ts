import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '{server_url}/user';

  constructor(private http: HttpClient) {}

  signup(user: { username: string; password: string; email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  login(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }
}
