import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private baseUrl = 'http://localhost:8080/loanapp/submitQuery'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  submitQuery(query: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Replace with your token retrieval logic
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.baseUrl}`, query, { headers });
  }
}
