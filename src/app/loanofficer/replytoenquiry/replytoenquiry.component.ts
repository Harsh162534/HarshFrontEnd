import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnquiryServiceService } from 'src/app/services/Enquiry/enquiry-service.service';

@Component({
  selector: 'app-replytoenquiry',
  templateUrl: './replytoenquiry.component.html',
  styleUrls: ['./replytoenquiry.component.css']
})
export class ReplytoenquiryComponent {
  enquiries: any[] = [];
  replyForm: FormGroup;
  selectedEnquiry: any;
  pageNumber: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  isLastPage: boolean = false;
  pages: number[] = [];

  constructor(private fb: FormBuilder, private enquiryService: EnquiryServiceService, private modalService: NgbModal) {
    this.replyForm = this.fb.group({
      response: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchEnquiries(this.pageNumber, this.pageSize);
  }

  fetchEnquiries(pageNumber: number, pageSize: number): void {
    this.enquiryService.getAllEnquiries(pageNumber, pageSize).subscribe({
      next: (response: any) => {
        this.enquiries = response.contents;
        this.totalPages = response.totalPages;
        this.isLastPage = response.last;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
      },
      error: (err: any) => console.error('Error fetching enquiries:', err)
    });
  }

  openModal(content: any, enquiry: any): void {
    this.selectedEnquiry = enquiry;
    this.replyForm.reset();
    this.modalService.open(content, { backdrop: 'static', size: 'lg' });
  }

  onReplyEnquiry(): void {
    if (this.replyForm.valid) {
      const response = this.replyForm.value.response;
      this.enquiryService.replyToEnquiry(this.selectedEnquiry.id, response).subscribe({
        next: () => {
          this.modalService.dismissAll();
          this.fetchEnquiries(this.pageNumber, this.pageSize);
        },
        error: (err: any) => console.error('Error replying to enquiry:', err)
      });
    }
  }

  onPageChange(newPage: number): void {
    this.pageNumber = newPage;
    this.fetchEnquiries(this.pageNumber, this.pageSize);
  }
}