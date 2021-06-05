import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDeFraisDeclarationComponent } from './note-de-frais-declaration.component';

describe('NoteDeFraisDeclarationComponent', () => {
  let component: NoteDeFraisDeclarationComponent;
  let fixture: ComponentFixture<NoteDeFraisDeclarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteDeFraisDeclarationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteDeFraisDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
