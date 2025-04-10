import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService extends BaseService {

  // -------- Universities --------
  getUniversities(): Observable<any> {
    return this.getRequest('/education/universities', 'universities');
  }

  getUniversityById(id: string): Observable<any> {
    return this.getRequest(`/education/university/${id}`, `university-${id}`);
  }

  addUniversity(data: any): Observable<any> {
    return this.postRequest('/education/university', data);
  }

  updateUniversity(id: string, data: any): Observable<any> {
    return this.putRequest(`/education/university/${id}`, data);
  }

  deleteUniversity(id: string): Observable<any> {
    return this.deleteRequest(`/education/university/${id}`);
  }

  // -------- Colleges --------
  getColleges(): Observable<any> {
    return this.getRequest('/education/colleges', 'colleges');
  }

  getCollegeById(id: string): Observable<any> {
    return this.getRequest(`/education/college/${id}`, `college-${id}`);
  }

  addCollege(data: any): Observable<any> {
    return this.postRequest('/education/college', data);
  }

  updateCollege(id: string, data: any): Observable<any> {
    return this.putRequest(`/education/college/${id}`, data);
  }

  deleteCollege(id: string): Observable<any> {
    return this.deleteRequest(`/education/college/${id}`);
  }

  // -------- Courses --------
  getCourses(): Observable<any> {
    return this.getRequest('/education/courses', 'courses');
  }

  getCourseById(id: string): Observable<any> {
    return this.getRequest(`/education/course/${id}`, `course-${id}`);
  }

  addCourse(data: any): Observable<any> {
    return this.postRequest('/education/course', data);
  }

  updateCourse(id: string, data: any): Observable<any> {
    return this.putRequest(`/education/course/${id}`, data);
  }

  deleteCourse(id: string): Observable<any> {
    return this.deleteRequest(`/education/course/${id}`);
  }
}
