import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Donor } from 'src/app/core/models/donor';
import { DonorService } from 'src/app/core/services/donor.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  donor: Donor;
  constructor(private donorService: DonorService) { }

  ngOnInit(): void {
    this.getDonor();
  }

  getDonor() {
    this.donorService.getDonorInfo().subscribe(
      (data: Donor) => {
        console.log(data);
        this.donor = data;
      },
      err => console.log(err)
    );
  }
}
