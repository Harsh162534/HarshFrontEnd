import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private baseUrl = 'http://localhost:8080/loanapp/submitQuery'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  submitQuery(query: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

    // Check if the token is missing
    if (!token) {
      alert('Authentication token is missing. Please log in.');
      return throwError(() => new Error('Authentication token is missing.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post(`${this.baseUrl}`, query, { headers })
      
      // .pipe(catchError(this.handleError)); // Catch errors and handle them
  }

  
  submitLoanApplication(application: { 
    loanamount: number; 
    time: number; 
    loanscheme:number; 
  }): Observable<any> {
    return this.http.post(this.baseUrl, application);
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Log error for debugging purposes
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
