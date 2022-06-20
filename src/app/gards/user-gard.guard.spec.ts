import { TestBed } from '@angular/core/testing';

import { UserGardGuard } from './user-gard.guard';

describe('UserGardGuard', () => {
  let guard: UserGardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserGardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
