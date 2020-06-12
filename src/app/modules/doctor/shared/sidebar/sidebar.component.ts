import { User } from 'src/app/core/models/user';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  doctor: User;
  constructor(private doctorService: UserService) { }

  ngOnInit(): void {
    this.getDoctor();
  }

  getDoctor() {
    this.doctorService.getUser().subscribe(
      (data: User) => {
        console.log(data);
        this.doctor = data;
      },
      err => console.log(err)
    );
  }
}
