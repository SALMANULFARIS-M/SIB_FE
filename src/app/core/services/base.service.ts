import { Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected apiUrl = environment.apiUrl;
  constructor(
    protected http: HttpClient,
    @Inject(PLATFORM_ID) protected platformId: object,
    protected transferState: TransferState
  ) { }

  /**
    * 🔹 Generic GET request with optional TransferState caching
    */
  protected getRequest<T>(endpoint: string, cacheKey?: string): Observable<T> {
    if (cacheKey) {
      const STATE_KEY = makeStateKey<T>(cacheKey);
      const storedData = this.transferState.get(STATE_KEY, null);

      if (storedData) {
        this.transferState.remove(STATE_KEY);
        return of(storedData);
      }
    }

    return this.http.get<T>(`${this.apiUrl}${endpoint}`).pipe(
      tap(data => {
        if (cacheKey && isPlatformServer(this.platformId)) {
          this.transferState.set(makeStateKey<T>(cacheKey), data);
        }
      }),
      catchError(error => {
        console.error(`Error fetching ${endpoint}:`, error);
        return of(null as unknown as T);
      })
    );
  }

  /**
   * 🔹 Generic POST request
   */
  protected postRequest<T>(endpoint: string, formData: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, formData).pipe(
      catchError(error => {
        console.error(`Error posting to ${endpoint}:`, error);
        return of(null as unknown as T);
      })
    );
  }
  /**
    * 🔹 Generic PUT request (Update)
    */
  protected putRequest<T>(endpoint: string, formData: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, formData).pipe(
      catchError(error => {
        console.error(`Error putting to ${endpoint}:`, error);
        return of(null as unknown as T);
      })
    );
  }

  /**
   * 🔹 Generic DELETE request
   */
  protected deleteRequest<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`).pipe(
      catchError(error => {
        console.error(`Error deleting ${endpoint}:`, error);
        return of(null as unknown as T);
      })
    );
  }
}
