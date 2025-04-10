import { Inject, Injectable, PLATFORM_ID, TransferState } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService {


  private readonly BLOG_KEY_PREFIX = 'blogs';
  private collapsed = new BehaviorSubject<boolean>(false);
  collapsedState = this.collapsed.asObservable();

  constructor(protected override http: HttpClient, @Inject(PLATFORM_ID) protected override platformId: object, protected override transferState: TransferState) {
    super(http, platformId, transferState);
  }


  /**
   * 🔹 Sidebar State Management
   */
  toggleSidebar() {
    this.collapsed.next(!this.collapsed.value);
  }

  setSidebarState(state: boolean) {
    this.collapsed.next(state);
  }

  /**
    * 🔹 Generic GET request with optional TransferState caching
    */

  addBlog(formData: FormData): Observable<any> {
    return this.postRequest('/admin/sib/addblog', formData);
  }

  getBlogs(page: number, limit: number, search: string = ''): Observable<any> {
    return this.getRequest(`/admin/sib/blogs?page=${page}&limit=${limit}&search=${search}`, `${this.BLOG_KEY_PREFIX}-${page}-${limit}-${search}`);
  }

  deleteBlog(blogId: string): Observable<any> {
    return this.getRequest(`/admin/sib/deleteblog/${blogId}`);
  }
}
