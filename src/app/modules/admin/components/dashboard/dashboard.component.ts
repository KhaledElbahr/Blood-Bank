import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { AdminService } from '../../services/admin.service';
import { Donor } from 'src/app/core/models/donor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: User[];
  students: Donor[];
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getStudents();
  }

  getUsers() {
    this.adminService.getUsers().subscribe(
      (data: User[]) => {
        console.log(data);
        this.users = data;
      },
      err => console.log(err)
    );
  }

  getStudents() {
    this.adminService.getStudents().subscribe(
      (data: Donor[]) => {
        console.log(data);
        this.students = data;
      },
      err => console.log(err)
    );
  }
}
