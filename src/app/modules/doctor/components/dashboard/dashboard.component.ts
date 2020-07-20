import { Request } from './../../../../core/models/request';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  requests: Request[];
  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    this.requestService.getRequests().subscribe(
      (data: Request[]) => this.requests = data,
      err => console.log(err)
    );
  }
}
