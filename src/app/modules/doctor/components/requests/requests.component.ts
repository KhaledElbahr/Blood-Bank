import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RequestComponent } from './request/request.component';
import { Request } from './../../models/request';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  requests: Request[];
  displayedColumns: string[] = [
    'patient_id',
    'patient_full_name',
    'product_type',
    'blood_group',
    'quantity',
    'requested_date',
    'required_date',
    'status',
    'priority',
    'actions'
  ];
  dataSource = new MatTableDataSource<Request>();
  searchKey: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private requestService: RequestService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getRequests();
  }

  onEdit(request: Request): void {
    const id = request.id;
    this.router.navigate(['./request'], {queryParams: {rId: `${id}`, 'enable-edit': true}, relativeTo: this.route});
    const dialogRef = this.dialog.open(RequestComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
      data: request
    });
    dialogRef.afterClosed().subscribe(() => this.getRequests());
  }

  onDelete(request: Request): void {
    console.log(request.id);
    const confirmation = window.confirm('Are you sure you want to remove this Request?');
    if (confirmation) {
      this.deleteRequest(request);
    }
  }

  getRequests() {
    this.requestService.getRequests().subscribe(
      (data: Request[]) => {
        this.requests = data;
        this.dataSource = new MatTableDataSource<Request>(this.requests);
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

  deleteRequest(request: Request) {
    this.requestService.deleteRequest(request.id).subscribe(
      () => this.getRequests(),
       err => console.log(err)
    );
  }
}