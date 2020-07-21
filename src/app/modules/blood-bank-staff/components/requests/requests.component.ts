import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RequestsService } from '../../services/requests.service';
import { Request } from './../../../../core/models/request';
import { HandleRequestComponent } from './handle-request/handle-request.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private notifyService: NotificationService,
    private requestsService: RequestsService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getRequests();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  confirmRequest(request: Request): void {
    this.router.navigate(['./handle-request'], { queryParams: { id: request.id }, relativeTo: this.route });
    const dialogRef = this.dialog.open(HandleRequestComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
      data: request
    });
    dialogRef.afterClosed().subscribe(() => this.getRequests());
  }

  cancelRequest(request: Request) {
    const rejected = {
      request_id: request.id,
      status: 2,
    };
    const confirmation = window.confirm('Are you sure you want to Reject this Request?');
    if (confirmation) {
      this.deleteRequest(rejected);
    }
  }

  getRequests() {
    this.requestsService.getRequests().subscribe(
      (data: Request[]) => {
        this.requests = data;
        this.dataSource = new MatTableDataSource<Request>(this.requests);
      },
      err => console.log(err)
    );
  }

  deleteRequest(rejectedRequest) {
    this.requestsService.confirmRequest(rejectedRequest).subscribe(
      () => {
        this.getRequests();
        this.notifyService.notify('Deleted Successfully');
      },
      err => console.log(err)
    );
  }
}
