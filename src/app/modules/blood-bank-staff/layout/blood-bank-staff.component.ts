import { Component } from '@angular/core';

@Component({
  selector: 'app-blood-bank-staff',
  templateUrl: './blood-bank-staff.component.html',
  styleUrls: ['./blood-bank-staff.component.scss']
})
export class BloodBankStaffComponent {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
