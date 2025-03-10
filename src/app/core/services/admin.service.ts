import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private collapsed = new BehaviorSubject<boolean>(false);
  collapsedState = this.collapsed.asObservable();

 constructor(private http: HttpClient) { }
  // private apiUrl =environment.apiUrl;
  private apiUrl ='http://localhost:5000';
  toggleSidebar() {
    this.collapsed.next(!this.collapsed.value);
  }
  setSidebarState(state: boolean) {
    this.collapsed.next(state); // <-- New method to set sidebar state
  }
}
