import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Blog } from '../../modules/user/user.interface';
import { isPlatformServer } from '@angular/common';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(protected override http: HttpClient, @Inject(PLATFORM_ID) protected override platformId: object, protected override transferState: TransferState) {
    super(http, platformId, transferState);
  }
  /**
   * ✅ API Calls using reusable methods
   */
  apply(formData: any): Observable<any> {
    return this.postRequest('/user/apply', formData);
  }

  freeCounsiling(formData: any): Observable<any> {
    return this.postRequest('/user/counceling', formData);
  }

  sendContactForm(formData: any): Observable<any> {
    return this.postRequest('/user/contact', formData);
  }

  latestBlogs(): Observable<any> {
    return this.getRequest('/user/latestBlogs', 'latestBlogs');
  }

  getBlogBySlug(slug: string): Observable<Blog> {
    return this.getRequest<Blog>(`/user/blog/${slug}`);
  }

  getBlogsWithQuery(page: number, limit: number, search: string): Observable<any> {
    return this.getRequest(`/user/blogs?page=${page}&limit=${limit}&search=${search}`, `blogs-${page}-${limit}-${search}`);
  }
}

