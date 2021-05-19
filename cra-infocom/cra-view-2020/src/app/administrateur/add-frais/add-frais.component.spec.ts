import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFraisComponent } from './add-frais.component';

describe('AddFraisComponent', () => {
  let component: AddFraisComponent;
  let fixture: ComponentFixture<AddFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFraisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
