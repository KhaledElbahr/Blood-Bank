import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorInfoComponent } from './donor-info.component';

describe('DonorInfoComponent', () => {
  let component: DonorInfoComponent;
  let fixture: ComponentFixture<DonorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
