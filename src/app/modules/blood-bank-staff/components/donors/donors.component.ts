import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DonorComponent } from './donor/donor.component';
import { Donor } from '../../models/donor';
import { DonorService } from '../../services/donor.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.scss']
})
export class DonorsComponent implements OnInit {
  searchKey: string;
  findDonor = false;
  donor: Donor;

  constructor(
    private donorService: DonorService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(DonorComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
    });
    this.router.navigate(['./donor'], { queryParams: { id: 0, 'add-donor': true }, relativeTo: this.route });
  }

  applyFilter() {
    const ssn = this.searchKey.trim().toLowerCase();
    this.getDonor(ssn);
  }

  onSearchClear() {
    this.searchKey = '';
  }

  getDonor(ssn: string) {
    this.donorService.getDonorBySSN(ssn).subscribe(
      (data: Donor) => {
        this.donor = data;
        if (this.donor) {
          this.router.navigate(['./find-donor'], { queryParams: { id: this.donor.id }, relativeTo: this.route });
        }
        this.findDonor = true;
      },
      err => {
        console.log(err);
        this.findDonor = false;
      }
    );
  }
}
