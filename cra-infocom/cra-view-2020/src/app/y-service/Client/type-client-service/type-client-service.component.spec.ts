import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeClientServiceComponent } from './type-client-service.component';

describe('TypeClientServiceComponent', () => {
  let component: TypeClientServiceComponent;
  let fixture: ComponentFixture<TypeClientServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeClientServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeClientServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
