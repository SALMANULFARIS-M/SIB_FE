import { Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private collapsed = new BehaviorSubject<boolean>(false);
  collapsedState = this.collapsed.asObservable();
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object,
  private transferState: TransferState) { }

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
    const BLOG_KEY = makeStateKey<any>(`blogs-${page}-${limit}-${search}`);
    const storedData = this.transferState.get(BLOG_KEY, null);

    if (storedData) {
      // ✅ Use cached data during browser boot
      this.transferState.remove(BLOG_KEY); // Optional: remove after using
      return of(storedData);
    } else {
      return this.http.get(`${this.apiUrl}/admin/sib/blogs?page=${page}&limit=${limit}&search=${search}`)
        .pipe(
          tap(data => {
            if (isPlatformServer(this.platformId)) {
              // ✅ Store data during SSR for browser reuse
              this.transferState.set(BLOG_KEY, data);
            }
          })
        );
    }
  }

  deleteBlog(blogId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/sib/deleteblog/${blogId}`);
  }


}
