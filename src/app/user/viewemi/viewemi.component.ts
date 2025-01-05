import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewapplyloansService } from 'src/app/services/applyloan/viewapplyloans.service';

@Component({
  selector: 'app-viewemi',
  templateUrl: './viewemi.component.html',
  styleUrls: ['./viewemi.component.css']
})
export class ViewemiComponent {
  loans: any[] = []; // Holds the list of loans
  
  constructor(private emipayService: ViewapplyloansService, private router: Router) {}

  ngOnInit(): void {

    
    
    // Fetch loans data on component initialization
    this.emipayService.getLoans().subscribe((data: any[]) => {
      // Map the response to extract the required fields
      this.loans = data.map(loan => ({
        loanId: loan.loanid,
        schemeName: loan.loanScheme?.schemename,
        loanAmount: loan.loanamount || 0,
        loanRepayAmount: loan.totalRepayAmount,
        duration: loan.time || 0,
        //loanId: loan.loanid
      }));
      console.log('Mapped Loans:', this.loans); 
    
    });
  }

  // Navigate to EMI details page for the selected loan
  viewEmis(loanId: number): void {
    console.log(`Navigating to: /userdashboard/payemi/viewemis/${loanId}`);
    this.router.navigate([`/userdashboard/payemi/viewemis`, loanId]);
  }
  


}
