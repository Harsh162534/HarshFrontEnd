import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanOfficerService {

  constructor(private http:HttpClient) { }
  private LoanOfficerUrl = 'http://localhost:8080/loanapp/loanofficer';

  private deleteLoanOfficerUrl ="http://localhost:8080/loanapp/admin/deletelaonofficer";

  getAllLoanOfficer(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())        // Changed from 'pageNumber' to 'page'
      .set('pageSize', pageSize.toString()); // Keep 'pageSize' as is
    
    return this.http.get<any>(`${this.LoanOfficerUrl}`, { params });
  }

  deleteLoanOfficer(id: number): Observable<any> {
    const params = new HttpParams()
    .set("id",id.toString());
    return this.http.put<any>(`${this.deleteLoanOfficerUrl}`, { params });
  }

  AddLoanOfficers(value:any){
    return this.http.post<any>(this.LoanOfficerUrl, value);
  }
}
