import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCollaborateurComponent } from './search-collaborateur.component';

describe('SearchCollaborateurComponent', () => {
  let component: SearchCollaborateurComponent;
  let fixture: ComponentFixture<SearchCollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCollaborateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
