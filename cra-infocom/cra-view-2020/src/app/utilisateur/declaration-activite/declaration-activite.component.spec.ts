import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationActiviteComponent } from './declaration-activite.component';

describe('DeclarationActiviteComponent', () => {
  let component: DeclarationActiviteComponent;
  let fixture: ComponentFixture<DeclarationActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeclarationActiviteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
