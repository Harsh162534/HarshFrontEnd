import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplyloansService } from 'src/app/services/applyloan/applyloans.service';

@Component({
  selector: 'app-applyloan',
  templateUrl: './applyloan.component.html',
  styleUrls: ['./applyloan.component.css']
})
export class ApplyloanComponent implements OnInit {
  @Input() loanScheme: any; // Receive loan scheme details
  @Output() loanSubmitted = new EventEmitter<void>(); // Emit event on submission

  uploadForm: FormGroup;
  file: File | null = null;

  constructor(private fb: FormBuilder, private loanService: ApplyloansService) {
    this.uploadForm = this.fb.group({
      loanAmount: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files?.length) {
      const selectedFile = files[0];
      const allowedTypes = ['application/pdf', 'image/jpeg'];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert('Only PDF and JPEG files are allowed.');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('File size exceeds the maximum limit of 5 MB.');
        return;
      }
      this.file = selectedFile;
    }
  }

  onSubmit(): void {
    if (this.file && this.uploadForm.valid) {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('loanamount', this.uploadForm.value.loanAmount);
      formData.append('time', this.uploadForm.value.time);
  
      if (this.loanScheme && this.loanScheme.id) {
        formData.append('loanscheme_id', this.loanScheme.id.toString()); // Include loan scheme ID in formData
  
        // Call the service method with both arguments
        this.loanService.uploadFile(formData, this.loanScheme.id).subscribe(
          (response) => {
            console.log('Loan application successful:', response);
            alert('Loan application submitted successfully.');
            this.loanSubmitted.emit(); // Emit the event
          },
          (error) => {
            console.error('Error submitting loan application:', error);
            alert('Failed to submit the application. Please try again.');
          }
        );
      } else {
        alert('Loan scheme details are missing.');
      }
    } else {
      alert('Please fill the form correctly and upload a valid file.');
    }
  }
  
}
