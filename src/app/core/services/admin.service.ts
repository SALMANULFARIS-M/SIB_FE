import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private collapsed = new BehaviorSubject<boolean>(false);
  collapsedState = this.collapsed.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }
  private apiUrl =environment.apiUrl;
  // private apiUrl = 'http://localhost:5000';
  toggleSidebar() {
    this.collapsed.next(!this.collapsed.value);
  }
  setSidebarState(state: boolean) {
    this.collapsed.next(state);
  }
  addBlog(formData: FormData): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.post(`${this.apiUrl}/admin/sib/addblog`, formData);
    } else {
      // Return an empty observable or handle differently in SSR mode
      return of({ error: 'File upload is not supported in SSR mode' });
    }
  }
  getBlogs(page: number, limit: number, search: string = ''): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/sib/blogs?page=${page}&limit=${limit}&search=${search}`);
  }
  deleteBlog(blogId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/sib/deleteblog/${blogId}`);
  }


}
