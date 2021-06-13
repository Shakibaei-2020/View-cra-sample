import { TestBed } from '@angular/core/testing';

import { JwtUserService } from './jwt-user.service';

describe('JwtUserService', () => {
  let service: JwtUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
