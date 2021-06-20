import { TestBed } from '@angular/core/testing';

import { CollabJoinProjectService } from './collab-join-project.service';

describe('CollabJoinProjectService', () => {
  let service: CollabJoinProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollabJoinProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
