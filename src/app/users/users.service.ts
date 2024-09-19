import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://system.osolna.com/api';

  constructor(private http: HttpClient) {}

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Accept': 'application/json',
      'Accept-Language': 'ar',
      'App-Version': '11',
      'Device-Name': 'chrome',
      'Device-OS-Version': '13',
      'Device-UDID': '1234',
      'Device-Push-Token': '123456',
      'Device-Type': 'web',
      'Authorization': token ? `Bearer ${token}` : '',
    });
  }

  getAllUsers(): Observable<any> {
    const params = new HttpParams().set('return_all', '1');
    return this.http.get(`${this.baseUrl}/users`, { headers: this.createHeaders(), params });
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}`, { headers: this.createHeaders() });
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/create`, userData, { headers: this.createHeaders() });
  }

  editUser(userId: number, userData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/${userId}/edit`, userData, {
      headers: this.createHeaders(),
    });
}


  activateUser(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/${userId}/activation`, {}, { headers: this.createHeaders() });
  }
  getAllCountries(): Observable<any> {
    const params = new HttpParams().set('return_all', '1');
    return this.http.get(`${this.baseUrl}/countries`, { headers: this.createHeaders(), params });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}`, { headers: this.createHeaders() });
  }

}
