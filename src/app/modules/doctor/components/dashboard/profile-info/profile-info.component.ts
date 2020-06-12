import { User } from 'src/app/core/models/user';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from '../../../services/doctor.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'doctor-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  doctor: User;
  constructor(
    public dialog: MatDialog,
    private doctorService: UserService) { }

  ngOnInit(): void {
    this.getDoctor();
  }

  onEdit(doctor: User): void {
    //   const dialogRef = this.dialog.open(EditProfileComponent, {
    //     disableClose: true,
    //     autoFocus: true,
    //     width: '35%',
    //     data: doctor
    //   });
    //   dialogRef.afterClosed().subscribe(() => this.getDoctor());
  }

  onResetPassword() {
    //   const dialogRef = this.dialog.open(ResetPasswordComponent, {
    //     disableClose: true,
    //     autoFocus: true,
    //     width: '35%',
    //   });
    //   dialogRef.afterClosed().subscribe(() => this.getDoctor());
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
