import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFraisComponent } from './search-frais.component';

describe('SearchFraisComponent', () => {
  let component: SearchFraisComponent;
  let fixture: ComponentFixture<SearchFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFraisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
