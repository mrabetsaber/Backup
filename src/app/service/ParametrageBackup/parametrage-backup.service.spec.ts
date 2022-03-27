import { TestBed } from '@angular/core/testing';

import { ParametrageBackupService } from './parametrage-backup.service';

describe('ParametrageBackupService', () => {
  let service: ParametrageBackupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametrageBackupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
