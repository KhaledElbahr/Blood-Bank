import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DonorComponent } from '../donor/donor.component';
import { Donor } from '../../../models/donor';

@Component({
  selector: 'app-donor-info',
  templateUrl: './donor-info.component.html',
  styleUrls: ['./donor-info.component.scss']
})
export class DonorInfoComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('donorInfo') donor: Donor;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }


  ngOnInit() { }

  addActivity() {
    console.log('Not Implemented Yet!!!');
  }

  updateDonor(donor: Donor) {
    this.router.navigate(['../../../donor'],
      { queryParams: { id: `${this.donor.id}`, 'enable-edit': true }, relativeTo: this.route });
    const dialogRef = this.dialog.open(DonorComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
      data: donor
    });
  }

  onDelete() {
    // console.log('Not Implemented Yet!!!');
  }
}
