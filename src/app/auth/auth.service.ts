import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(field: string, password: string): Observable<any> {
    const url = 'https://system.osolna.com/api/auth/admin-login';
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Accept-Language': 'ar',
      'App-Version': '11',
      'Device-Name': 'chrome',
      'Device-OS-Version': '13',
      'Device-UDID': '1234',
      'Device-Push-Token': '123456',
      'Device-Type': 'web',
    });

    const body = {
      field,
      password,
      type: 'admin',
    };

    return this.http.post<any>(url, body, { headers }).pipe(
      tap((response: any) => {
        if (response && response.data && response.data.token) {
          localStorage.setItem('authToken', response.data.token);
        } else {
          console.error('Token not found in response');
        }
      })
    );
  }


}
