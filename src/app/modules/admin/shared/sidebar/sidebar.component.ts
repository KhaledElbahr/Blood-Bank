import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  admin: User;
  constructor(
    private adminService: UserService) { }

  ngOnInit(): void {
    this.getAdmin();
  }

  getAdmin() {
    this.adminService.getUser().subscribe(
      (data: User) => {
        console.log(data);
        this.admin = data;
      },
      err => console.log(err)
    );
  }
}
