import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplyloansService {
  
  private apiUrl = 'http://localhost:8080/loanapp/upload';

  constructor(private http: HttpClient) {}

  // Submit loan application using HTTP POST
  submitLoanApplication(application: { 
    loanamount: number; 
    time: number; 
    loanscheme:number; 
  }): Observable<any> {
    return this.http.post(this.apiUrl, application);
  }
  uploadFile(data: FormData, loanSchemeId: any): Observable<any> {
    const params = new HttpParams().set('loanSchemeId', loanSchemeId.toString());
    return this.http.post<any>(this.apiUrl, data, { params });
  }
  
}
