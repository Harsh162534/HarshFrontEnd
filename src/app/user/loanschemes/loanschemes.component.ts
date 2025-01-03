import { Component } from '@angular/core';
import { LoanschemeService } from 'src/app/services/loanscheme/loanscheme.service';

@Component({
  selector: 'app-loanschemes',
  templateUrl: './loanschemes.component.html',
  styleUrls: ['./loanschemes.component.css']
})
export class LoanschemesComponent {
applyForLoan(_t16: any) {
throw new Error('Method not implemented.');
}
  loanSchemes: any[] = [];  
  totalPages: number = 0;   
  currentPage: number = 1; 
  pageSize: number = 2;     

  constructor(private loanSchemeService: LoanschemeService) { }

  ngOnInit(): void {
    this.loadLoanSchemes();
  }

  // Method to load loan schemes from the service
  loadLoanSchemes(page: number = 1): void {
    // Pass both pageNumber and pageSize to the service method
      this.loanSchemeService.getLoanSchemes(page, this.pageSize).subscribe(response => {
      this.loanSchemes = response.contents;  // Get the loan schemes from response
      this.totalPages = response.totalPages;  // Get the total number of pages
    });
  }

  
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadLoanSchemes(page);  // Reload loan schemes with new page number
  }
}
