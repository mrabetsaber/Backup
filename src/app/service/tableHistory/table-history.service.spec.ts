import { TestBed } from '@angular/core/testing';

import { TableHistoryService } from './table-history.service';

describe('TableHistoryService', () => {
  let service: TableHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
