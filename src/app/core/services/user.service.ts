import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyeZD-0FNAunDuOc9nicowQ2oebm--Yvb8HbBig83sC0S7L1rw0XYrw6q8YhgVu0z5J/exec';
  constructor(private http: HttpClient) { }

  apply(formData: any): Observable<any> {
    return this.http.post(this.googleScriptUrl, JSON.stringify(formData), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
