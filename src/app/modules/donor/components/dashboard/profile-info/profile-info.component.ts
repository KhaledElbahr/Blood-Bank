import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import { Donor } from 'src/app/core/models/donor';
import { DonorService } from 'src/app/core/services/donor.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'donor-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  donor: Donor;
  constructor(
    public dialog: MatDialog,
    private donorService: DonorService) { }

  ngOnInit(): void {
    this.getDonor();
  }

  getDonor() {
    this.donorService.getDonorInfo().subscribe(
      (data: Donor) => {
        this.donor = data;
      },
      err => console.log(err)
    );
  }

}
