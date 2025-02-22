import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  apply(formData: any): Observable<any> {
    return this.http.post('http://localhost:5000/user/apply', JSON.stringify(formData), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  freeCounsiling(formData: any): Observable<any> {
    return this.http.post('http://localhost:5000/user/counceling', JSON.stringify(formData), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
