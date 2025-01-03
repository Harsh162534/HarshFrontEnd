import { Component, OnInit } from '@angular/core';
import { AllappliedloanService } from 'src/app/services/applyloan/allappliedloan.service';

@Component({
  selector: 'app-allappliedloan',
  templateUrl: './allappliedloan.component.html',
  styleUrls: ['./allappliedloan.component.css']
})
export class AllappliedloanComponent implements OnInit {
  loans: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private loanSchemeService: AllappliedloanService) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(page: number = 1): void {
    this.loanSchemeService.getLoans(page, this.pageSize).subscribe(response => {
      this.loans = response.contents;
      this.totalPages = response.totalPages;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadLoans(page);
  }
}
