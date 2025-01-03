// import { Component, OnInit } from '@angular/core';
// import { ApplyloansService } from 'src/app/services/applyloan/applyloans.service';
// import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

// @Component({
//   selector: 'app-applyloan',
//   templateUrl: './applyloan.component.html',
//   styleUrls: ['./applyloan.component.css']
// })
// export class ApplyloanComponent implements OnInit {
//   selectedFile: File | null = null;

//   loanDetails = {
//     user_id: 1,
//     loanamount: 50000.0,
//     time: 2,
//     loanscheme: {
//       id: 1,
//       schemeName: 'Home Loan'
//     }
//   };

//   loanSchemes = [
//     { id: 1, schemeName: 'Home Loan' },
//     { id: 2, schemeName: 'Personal Loan' },
//     { id: 3, schemeName: 'Car Loan' }
//   ];

//   constructor(private loanService: ApplyloansService, private http: HttpClient) {}

//   ngOnInit(): void {
//     // You can load available loan schemes here if needed
//   }

//   onFileSelected(event: Event): void {
//     const inputElement = event.target as HTMLInputElement;
//     if (inputElement?.files?.length) {
//       this.selectedFile = inputElement.files[0];
//     }
//   }

//   onSubmit(): void {

//     const formData = new FormData();
//     formData.append('file', this.selectedFile);
//     formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');  // Replace with your Cloudinary upload preset
    
//     // Make a POST request to Cloudinary to upload the file
//     fetch(this.cloudinaryUrl, {
//       method: 'POST',
//       body: formData,
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Upload successful:', data);
//       // Use the data returned by Cloudinary (image URL, etc.)
//     })
//     .catch(error => {
//       console.error('Error uploading file:', error);
//     });
//   }
//   cloudinaryUrl(cloudinaryUrl: any, arg1: { method: string; body: FormData; }) {
//     throw new Error('Method not implemented.');
//   }
//     if (this.selectedFile) {
//       const formData: FormData = new FormData();
//       formData.append('file', this.selectedFile, this.selectedFile.name);
//       formData.append('user_id', this.loanDetails.user_id.toString());
//       formData.append('loanscheme_id', this.loanDetails.loanscheme.id.toString());
//       formData.append('loanamount', this.loanDetails.loanamount.toString());
//       formData.append('time', this.loanDetails.time.toString());

//       const uploadReq = new HttpRequest('POST', 'http://localhost:8080/loanapp/upload', formData, {
//         headers: new HttpHeaders(),
//       });

//       this.http.request(uploadReq).subscribe(
//         (response: any) => {
//           alert('Loan Application Submitted Successfully!');
//           console.log(response);
//         },
//         error => {
//           alert('An error occurred while submitting your loan application');
//           console.error(error);
//         }
//       );
//     } else {
//       alert('Please select a file before submitting.');
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplyloansService } from 'src/app/services/applyloan/applyloans.service';

@Component({
  selector: 'app-applyloan',
   templateUrl: './applyloan.component.html',
   styleUrls: ['./applyloan.component.css']
})
export class ApplyloanComponent implements OnInit {
  uploadForm: FormGroup;
  file: File | null = null;

  constructor(private fb: FormBuilder, private loanService: ApplyloansService) {
    this.uploadForm = this.fb.group({
      userId: ['', Validators.required],
      loanSchemeId: ['', Validators.required],
      loanAmount: ['', Validators.required],
      time: ['', Validators.required],
      loanStatus: [''],
      closed: [false],
    });
  }

  ngOnInit(): void {
    // Initialization logic here
  }

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
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('user_id', this.uploadForm.value.userId);
      formData.append('loanscheme_id', this.uploadForm.value.loanSchemeId);
      formData.append('loanamount', this.uploadForm.value.loanAmount);
      formData.append('time', this.uploadForm.value.time);
     

      this.loanService.uploadFile(formData).subscribe(
        (response: any) => {
          console.log('File uploaded successfully:', response);
          alert('Loan Applied Successfully.');
        },
        (error: any) => {
          console.error('Error uploading file:', error);
          alert('Failed to upload file. Please try again.');
        }
      );
    }
  }
}
