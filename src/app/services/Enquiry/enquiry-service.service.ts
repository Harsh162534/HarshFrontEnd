import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquiryServiceService {
  private baseUrl = 'http://localhost:8080/loanapp/unresolvedQuery';

  constructor(private http: HttpClient) {}

  getAllEnquiries(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  replyToEnquiry(enquiryId: number, response: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reply`, { enquiryId, response });
  }
}
