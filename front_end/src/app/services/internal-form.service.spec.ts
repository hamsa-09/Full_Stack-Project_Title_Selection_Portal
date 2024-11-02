import { TestBed } from '@angular/core/testing';

import { InternalFormService } from './internal-form.service';

describe('InternalFormService', () => {
  let service: InternalFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
