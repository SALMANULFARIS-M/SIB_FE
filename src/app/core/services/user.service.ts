import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Blog } from '../../modules/user/user.interface';
import { isPlatformServer } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private transferState: TransferState, @Inject(PLATFORM_ID) private platformId: Object) { }
  private apiUrl = environment.apiUrl;
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

  // ✅ Optimized with TransferState
  latestBlogs(): Observable<any> {
    const BLOG_KEY = makeStateKey<any>('latestBlogs');
    const storedData = this.transferState.get(BLOG_KEY, null);

    if (storedData) {
      this.transferState.remove(BLOG_KEY);
      return of(storedData);
    } else {
      return this.http.get(`${this.apiUrl}/user/latestBlogs`).pipe(
        tap(data => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(BLOG_KEY, data);
          }
        })
      );
    }
  }

  getBlogBySlug(slug: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/user/blog/${slug}`); // Correct API URL format
  }


  // ✅ Optimized with TransferState
  getBlogsWithQuery(page: number, limit: number, search: string): Observable<any> {
    const QUERY_KEY = makeStateKey<any>(`blogs-${page}-${limit}-${search}`);
    const storedData = this.transferState.get(QUERY_KEY, null);

    if (storedData) {
      this.transferState.remove(QUERY_KEY);
      return of(storedData);
    } else {
      return this.http.get<any>(`${this.apiUrl}/user/blogs?page=${page}&limit=${limit}&search=${search}`).pipe(
        tap(data => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(QUERY_KEY, data);
          }
        })
      );
    }
  }


}
