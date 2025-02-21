import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private googleScriptUrl = 'https://script.google.com/a/macros/studyinbengaluru.com/s/AKfycbybOlbOhd6equBg2fHhWXDWh4JdGVnPSZGV_7ScQe77m86Hje2I_LYr1TtyZNrFQrRH6g/exec';
  constructor(private http: HttpClient) { }

  apply(formData: any): Observable<any> {
    return this.http.post(this.googleScriptUrl, formData);
  }
}
