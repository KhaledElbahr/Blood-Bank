import { UserComponent } from './user/user.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';
import { User } from 'src/app/core/models/user';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  displayedColumns: string[] = ['full_name', 'email', 'phone', 'gender', 'user_name', 'actions'];
  dataSource = new MatTableDataSource<User>();
  searchKey: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private notifyService: NotificationService,
    private adminService: AdminService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getUsers();
  }

  onCreate(): void {
    this.router.navigate(['./user'], { queryParams: { id: 0, 'add-user': true }, relativeTo: this.route });
    const dialogRef = this.dialog.open(UserComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
    });
    dialogRef.afterClosed().subscribe(() => this.getUsers());
  }

  onEdit(user: User): void {
    const id = user.id;
    this.router.navigate(['./user'], { queryParams: { id: `${id}`, 'enable-edit': true }, relativeTo: this.route });
    const dialogRef = this.dialog.open(UserComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
      data: user
    });
    dialogRef.afterClosed().subscribe(() => this.getUsers());
  }

  onDelete(user: User): void {
    console.log(user.id);
    const confirmation = window.confirm('Are you sure you want to remove this User?');
    if (confirmation) {
      this.delete(user);
    }
  }

  getUsers() {
    this.adminService.getUsers().subscribe(
      (data: User[]) => {
        console.log(data);
        this.users = data;
        this.dataSource = new MatTableDataSource<User>(this.users);
      },
      err => console.log(err)
    );
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  delete(user: User) {
    this.adminService.deleteUser(user.id).subscribe(
      () => {
        this.getUsers();
        this.notifyService.notify('Deleted Successfully');
      },
      err => console.log(err)
    );
  }

}
