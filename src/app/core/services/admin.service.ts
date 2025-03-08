import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


 constructor(private http: HttpClient) { }
  // private apiUrl =environment.apiUrl;
  private apiUrl ='http://localhost:5000';

}
