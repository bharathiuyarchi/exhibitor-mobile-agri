import { TestBed } from '@angular/core/testing';

import { NumberOnlyService } from './number-only.service';

describe('NumberOnlyService', () => {
  let service: NumberOnlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberOnlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
