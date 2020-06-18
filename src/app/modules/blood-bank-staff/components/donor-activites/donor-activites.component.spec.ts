import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorActivitesComponent } from './donor-activites.component';

describe('DonorActivitesComponent', () => {
  let component: DonorActivitesComponent;
  let fixture: ComponentFixture<DonorActivitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorActivitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorActivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
