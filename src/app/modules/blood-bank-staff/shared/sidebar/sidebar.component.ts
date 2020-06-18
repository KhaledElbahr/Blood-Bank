import { User } from 'src/app/core/models/user';
import { Component, OnInit } from '@angular/core';
import { BloodBankStaff } from '../../models/blood-bank-staff';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  bbStaff: User;
  constructor(private bbstaffService: UserService) { }

  ngOnInit(): void {
    this.getBloodBankStaff();
  }

  getBloodBankStaff() {
    this.bbstaffService.getUser().subscribe(
      (data: User) => {
        this.bbStaff = data;
      },
      err => console.log(err)
    );
  }
}
