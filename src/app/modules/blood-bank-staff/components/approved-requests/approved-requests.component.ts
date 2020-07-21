import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Request } from './../../../../core/models/request';
import { RequestsService } from '../../services/requests.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-approved-requests',
  templateUrl: './approved-requests.component.html',
  styleUrls: ['./approved-requests.component.scss']
})
export class ApprovedRequestsComponent implements OnInit {
  requests: Request[];
  displayedColumns: string[] = [
    'patient_id',
    'full_name',
    'product_type',
    'blood_group',
    'quantity',
    'created_at',
    'required_date',
    'status',
    'priority',
    'actions'
  ];
  dataSource = new MatTableDataSource<Request>();
  searchKey: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private notifyService: NotificationService,
    private requestsService: RequestsService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getApprovedRequests();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  removeRequest(request: Request): void {
    console.log(request.id);
    const confirmation = window.confirm('Are you sure you want to remove this Request?');
    if (confirmation) {
      this.deleteRequest(request);
    }
  }

  deleteRequest(request: Request) {
    this.requestsService.deleteHandledRequest(request.id).subscribe(
      () => {
        this.getApprovedRequests();
        this.notifyService.notify('Deleted Successfully');
      },
      err => console.log(err)
    );
  }

  getApprovedRequests() {
    this.requestsService.getApprovedRequests().subscribe(
      (data: Request[]) => {
        this.requests = data;
        this.dataSource = new MatTableDataSource<Request>(this.requests);
      },
      err => console.log(err)
    );
  }
}
