import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RequestsService } from '../../services/requests.service';
import { Request } from './../../../../core/models/request';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
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

  confirmRequest(request: Request): void { }

  cancelRequest(request: Request): void {
    console.log(request.id);
    const confirmation = window.confirm('Are you sure you want to Cancel this Request?');
    if (confirmation) {
      this.deleteRequest(request);
    }
  }

  deleteRequest(request: Request) {
    this.requestsService.deleteRequest(request.id).subscribe(
      () => this.getRequests(),
      err => console.log(err)
    );
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
}
