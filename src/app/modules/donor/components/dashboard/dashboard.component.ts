import { Component, OnInit } from '@angular/core';
import { DonorActivityService } from 'src/app/core/services/donor-activity.service';
import { DonorActivity } from 'src/app/core/models/donor-activity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activities: DonorActivity[];
  constructor(private donorActivityService: DonorActivityService) { }

  ngOnInit() {
    this.getActivities();
  }

  getActivities() {
    this.donorActivityService.getDonorActivities().subscribe(
      (data: DonorActivity[]) => this.activities = data,
      err => console.log(err)
    );
  }
}
