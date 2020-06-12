import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hstaff-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  hospitalStaff: User;
  constructor(
    public dialog: MatDialog,
    private hstaffService: UserService) { }

  ngOnInit(): void {
    this.getHospitalStaff();
  }

  onEdit(hStaff: User): void {
      // const dialogRef = this.dialog.open(EditProfileComponent, {
    //     disableClose: true,
    //     autoFocus: true,
    //     width: '35%',
    //     data: hStaff
    //   });
    //   dialogRef.afterClosed().subscribe(() => this.getHospitalStaff());
  }

  onResetPassword() {
      // const dialogRef = this.dialog.open(ResetPasswordComponent, {
    //     disableClose: true,
    //     autoFocus: true,
    //     width: '35%',
    //   });
    //   dialogRef.afterClosed().subscribe(() => this.getHospitalStaff());
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
