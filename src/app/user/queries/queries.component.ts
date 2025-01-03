import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QueryService } from 'src/app/services/queries/query.service';
 

@Component({
  selector: 'app-queries',
     templateUrl: './queries.component.html',
     styleUrls: ['./queries.component.css'],
})
export class QueriesComponent {

  constructor(private enquiryService: QueryService) { }

  onSubmit(queryForm: NgForm) {
    if (queryForm.valid) {
      const queryData = queryForm.value;
      this.enquiryService.submitQuery(queryData).subscribe(
        (response) => {
          alert('Query submitted successfully!');
          queryForm.reset();
        },
        (error) => {
          console.error('Error submitting query:', error);
          alert('Failed to submit query. Please try again.');
        }
    );
  }
}
}
