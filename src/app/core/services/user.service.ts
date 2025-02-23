import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
// import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private apiUrl ='http://localhost:5000';

  apply(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/apply`, JSON.stringify(formData), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  freeCounsiling(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/counceling`, JSON.stringify(formData), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  sendContactForm(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/contact`, JSON.stringify(formData), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
