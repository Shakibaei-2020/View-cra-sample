import { TestBed } from '@angular/core/testing';

import { TypeCollaboratorService } from './type-collaborator.service';

describe('TypeCollaboratorService', () => {
  let service: TypeCollaboratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCollaboratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
