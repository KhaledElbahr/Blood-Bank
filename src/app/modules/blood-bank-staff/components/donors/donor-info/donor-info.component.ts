import { DonorService } from './../../../services/donor.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DonorComponent } from '../donor/donor.component';
import { Donor } from '../../../models/donor';
import { ActivityComponent } from '../../donor-activites/activity/activity.component';

@Component({
  selector: 'app-donor-info',
  templateUrl: './donor-info.component.html',
  styleUrls: ['./donor-info.component.scss']
})
export class DonorInfoComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('donorInfo') donor: Donor;

  constructor(
    private donorService: DonorService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }


  ngOnInit() { }

  addActivity() {
    this.router.navigate(['./activity'],
      { queryParams: { id: 0, 'add-activity': true }, relativeTo: this.route });
    const dialogRef = this.dialog.open(ActivityComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['../../activities'], { relativeTo: this.route });
    });
  }

  updateDonor(donor: Donor) {
    this.router.navigate(['./donor'],
      { queryParams: { id: `${this.donor.id}`, 'enable-edit': true }, relativeTo: this.route });
    const dialogRef = this.dialog.open(DonorComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
      data: donor
    });
  }

  onDelete(donor: Donor): void {
    console.log(donor.id);
    const confirmation = window.confirm('Are you sure you want to remove this Donor?');
    if (confirmation) {
      this.delete(donor);
    }
  }

  delete(donor: Donor) {
    this.donorService.deleteDonor(donor.id).subscribe(
      () => console.log('Donor Deleted Successfully'),
      err => console.log(err)
    );
  }
}
