import { Component } from '@angular/core';
import { DonorService } from 'src/app/core/services/donor.service';
import { Donor } from 'src/app/core/models/donor';
import { RequestsService } from '../../services/requests.service';
import { StatisticsService } from './../../services/statistics.service';
import { Request } from './../../../../core/models/request';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  donors: Donor[];
  requests: Request[];
  handledRequests: Request[];
  expiredBags: any;
  constructor(
    private donorService: DonorService,
    private requestsService: RequestsService,
    private statisticsService: StatisticsService) {
    this.getDonors();
  }

  getDonors() {
    this.donorService.getDonors().subscribe(
      (data: Donor[]) => this.donors = data,
      err => console.log(err)
    );
  }

  getRequests() {
    this.requestsService.getRequests().subscribe(
      (data: Request[]) => this.requests = data,
      err => console.log(err)
    );
  }

  getApprovedRequests() {
    this.requestsService.getApprovedRequests().subscribe(
      (data: Request[]) => this.handledRequests = data,
      err => console.log(err)
    );
  }

  getExpiredBags() {
    this.statisticsService.getExpiredBags().subscribe(
      data => this.expiredBags = data,
      err => console.log(err)
    );
  }
}
