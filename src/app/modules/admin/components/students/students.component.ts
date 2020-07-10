import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';
import { StudentComponent } from './student/student.component';
import { Donor } from 'src/app/core/models/donor';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {


  students: Donor[];
  displayedColumns: string[] = ['full_name', 'email', 'phone', 'gender', 'ssn', 'user_name'];
  dataSource = new MatTableDataSource<Donor>();
  searchKey: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private adminService: AdminService) { }

  ngOnInit(): void{
    this.dataSource.paginator = this.paginator;
    this.getStudents();
  }

  onUploadFile(): void {
    this.router.navigate(['./upload-student'], { relativeTo: this.route });
    const dialogRef = this.dialog.open(StudentComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
    });
    dialogRef.afterClosed().subscribe(() => this.getStudents());
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  getStudents() {
    this.adminService.getStudents().subscribe(
      (data: Donor[]) => {
        console.log(data);
        this.students = data;
        this.dataSource = new MatTableDataSource<Donor>(this.students);
      },
      err => console.log(err)
    );
  }

}
