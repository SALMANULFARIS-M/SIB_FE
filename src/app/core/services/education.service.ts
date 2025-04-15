import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService extends BaseService {

  // -------- Universities --------
  getUniversities(params: { page?: number; limit?: number; search?: string } = {}): Observable<any> {
    let queryString = '';

    const queryArray = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);

    if (queryArray.length) {
      queryString = '?' + queryArray.join('&');
    }

    return this.getRequest(`/education/universities${queryString}`, 'universities');
  }

  getUniversityById(id: string): Observable<any> {
    return this.getRequest(`/education/university/${id}`, `university-${id}`);
  }

  getUniversityWithColleges(id: string): Observable<any> {
    return this.getRequest(`/collegesUnderUniversites/${id}`, `colleges-under-${id}`);
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
  getColleges(params: { page?: number; limit?: number; search?: string; category?: string } = {}): Observable<any> {
    let queryString = '';

    const queryArray = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);

    if (queryArray.length) {
      queryString = '?' + queryArray.join('&');
    }
    return this.getRequest(`/education/colleges${queryString}`, 'colleges');
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
  getCourses(params: { search?: string; level?: string; page?: number; limit?: number; } = {}): Observable<any> {
    const queryArray = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);

    const queryString = queryArray.length ? `?${queryArray.join('&')}` : '';
    return this.getRequest(`/education/courses${queryString}`, 'courses');
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
