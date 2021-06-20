import { TestBed } from '@angular/core/testing';

import { TypeLeaveService } from './type-leave.service';

describe('TypeLeaveService', () => {
  let service: TypeLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
