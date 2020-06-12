import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'admin-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  admin: User;
  constructor(
    public dialog: MatDialog,
    private adminService: UserService) { }

  ngOnInit(): void {
    this.getAdmin();
  }

  onEdit(admin: User): void {
  //   const dialogRef = this.dialog.open(EditProfileComponent, {
  //     disableClose: true,
  //     autoFocus: true,
  //     width: '35%',
  //     data: admin
  //   });
  //   dialogRef.afterClosed().subscribe(() => this.getAdmin());
  }

  onResetPassword() {
  //   const dialogRef = this.dialog.open(ResetPasswordComponent, {
  //     disableClose: true,
  //     autoFocus: true,
  //     width: '35%',
  //   });
  //   dialogRef.afterClosed().subscribe(() => this.getAdmin());
  }

  getAdmin() {
    this.adminService.getUser().subscribe(
      (data: User) => {
        this.admin = data;
      },
      err => console.log(err)
    );
  }

}
