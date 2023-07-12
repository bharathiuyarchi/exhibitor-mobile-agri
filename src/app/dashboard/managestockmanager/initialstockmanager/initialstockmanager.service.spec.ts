import { TestBed } from '@angular/core/testing';

import { InitialstockmanagerService } from './initialstockmanager.service';

describe('InitialstockmanagerService', () => {
  let service: InitialstockmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialstockmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
