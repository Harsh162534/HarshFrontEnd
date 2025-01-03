import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanschemeService {

  private apiUrl = 'http://localhost:8080/loanapp/loanschemes';  // Your API endpoint

  constructor(private http: HttpClient) {}

  getLoanSchemes(pageNumber: number, pageSize: number): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Create HttpParams with the necessary query parameters
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())  // Convert numbers to strings
      .set('pageSize', pageSize.toString());

    // Send the GET request with the headers and query parameters
    return this.http.get<any>(this.apiUrl, { headers, params });
  }
}
