import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFraisComponent } from './delete-frais.component';

describe('DeleteFraisComponent', () => {
  let component: DeleteFraisComponent;
  let fixture: ComponentFixture<DeleteFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFraisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
