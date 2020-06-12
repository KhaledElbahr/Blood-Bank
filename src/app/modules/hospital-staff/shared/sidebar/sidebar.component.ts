import { User } from 'src/app/core/models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  hospitalStaff: User;
  constructor(
    private hstaffService: UserService) { }

  ngOnInit(): void {
    this.getHospitalStaff();
  }

  getHospitalStaff() {
    this.hstaffService.getUser().subscribe(
      (data: User) => {
        console.log(data);
        this.hospitalStaff = data;
      },
      err => console.log(err)
    );
  }

}
