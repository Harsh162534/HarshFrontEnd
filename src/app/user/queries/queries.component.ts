import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QueryService } from 'src/app/services/queries/query.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css'],
})
export class QueriesComponent implements OnInit {
  uploadForm!: FormGroup; // Reactive form group

  constructor(private enquiryService: QueryService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the form with form controls and validation rules
    this.uploadForm = this.fb.group({
      question: ['', Validators.required],          // Required question field
      querytype: ['', Validators.required],         // Required query type select field
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.uploadForm.valid) {
      console.log('Form Submitted:', this.uploadForm.value);

      // Call your service method to submit the form data to the backend
      this.enquiryService.submitQuery(this.uploadForm.value).subscribe(
        (response: any) => {
          console.log('Query submitted successfully:', response);
          alert('Your query has been submitted successfully.');
        },
        (error: any) => {
          console.error('Error submitting query:', error);  // Enhanced logging
          alert('Failed to submit query. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
