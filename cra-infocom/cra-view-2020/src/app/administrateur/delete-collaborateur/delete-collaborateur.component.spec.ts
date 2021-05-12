import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCollaborateurComponent } from './delete-collaborateur.component';

describe('DeleteCollaborateurComponent', () => {
  let component: DeleteCollaborateurComponent;
  let fixture: ComponentFixture<DeleteCollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCollaborateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
