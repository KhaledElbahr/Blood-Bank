import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodProductsComponent } from './blood-products.component';

describe('BloodProductsComponent', () => {
  let component: BloodProductsComponent;
  let fixture: ComponentFixture<BloodProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
