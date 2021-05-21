import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionAddComponent } from './mission-add.component';

describe('MissionAddComponent', () => {
  let component: MissionAddComponent;
  let fixture: ComponentFixture<MissionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
