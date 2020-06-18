import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bbstaff-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  bbstaff: User;
  constructor(
    public dialog: MatDialog,
    private bbStaffService: UserService) { }

  ngOnInit(): void {
    this.getBloodBankStaff();
  }

  onEdit(admin: User): void {
  //   const dialogRef = this.dialog.open(EditProfileComponent, {
  //     disableClose: true,
  //     autoFocus: true,
  //     width: '35%',
  //     data: admin
  //   });
  //   dialogRef.afterClosed().subscribe(() => this.getBloodBankStaff());
  }

  onResetPassword() {
  //   const dialogRef = this.dialog.open(ResetPasswordComponent, {
  //     disableClose: true,
  //     autoFocus: true,
  //     width: '35%',
  //   });
  //   dialogRef.afterClosed().subscribe(() => this.getBloodBankStaff());
  }

  getBloodBankStaff() {
    this.bbStaffService.getUser().subscribe(
      (data: User) => {
        this.bbstaff = data;
      },
      err => console.log(err)
    );
  }

}
