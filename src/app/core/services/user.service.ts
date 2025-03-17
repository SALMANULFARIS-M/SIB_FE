import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Blog } from '../../modules/user/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private apiUrl =environment.apiUrl;
  // private apiUrl ='http://localhost:5000';

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
  latestBlogs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/latestBlogs` );
  }
  getBlogBySlug(slug: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/user/blog/${slug}`); // Correct API URL format
  }
  getBlogsWithQuery(page: number, limit: number, search: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/blogs?page=${page}&limit=${limit}&search=${search}`);
   }

}
