import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankStaffComponent } from './blood-bank-staff.component';

describe('BloodBankStaffComponent', () => {
  let component: BloodBankStaffComponent;
  let fixture: ComponentFixture<BloodBankStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodBankStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodBankStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
