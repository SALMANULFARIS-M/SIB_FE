import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
 constructor(private http: HttpClient) { }
  private apiUrl =environment.apiUrl;

  //  private apiUrl ='http://localhost:5000';

 adminLogin(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/sib/login`, JSON.stringify(formData), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

}
