import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService extends BaseService {

  adminLogin(formData: any): Observable<any> {
    return this.postRequest<any>('/admin/sib/login', formData);
  }

}
