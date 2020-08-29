import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHotelComponent } from './all-hotels.component';

describe('AllHotelComponent', () => {
  let component: AllHotelComponent;
  let fixture: ComponentFixture<AllHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllHotelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
