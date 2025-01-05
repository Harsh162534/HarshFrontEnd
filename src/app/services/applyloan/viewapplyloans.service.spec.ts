import { TestBed } from '@angular/core/testing';

import { ViewapplyloansService } from './viewapplyloans.service';

describe('ViewapplyloansService', () => {
  let service: ViewapplyloansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewapplyloansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
