import { Component, OnInit } from '@angular/core';
import { BloodBankStaff } from '../../models/blood-bank-staff';
import { BloodBankStaffService } from '../../services/blood-bank-staff.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  bbStaff: BloodBankStaff;
  constructor(
    private bbstaffService: BloodBankStaffService) { }

  ngOnInit(): void {
    this.getBloodBankStaff();
  }

  getBloodBankStaff() {
    console.warn('Not Implemented yet!!!');
    // this.bbstaffService.getBloodBankStaff().subscribe(
    //   (data: BloodBankStaff) => {
    //     console.log(data);
    //     this.bbStaff = data;
    //   },
    //   err => console.log(err)
    // );
  }
}
