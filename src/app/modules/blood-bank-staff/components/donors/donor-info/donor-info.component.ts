import { DonorService } from '../../../../../core/services/donor.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DonorComponent } from '../donor/donor.component';
import { ActivityComponent } from '../../donor-activites/activity/activity.component';
import { Donor } from 'src/app/core/models/donor';
import { NotificationService } from 'src/app/core/services/notification.service';

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
    private notifyService: NotificationService,
    private dialog: MatDialog) { }


  ngOnInit() { }

  addActivity(donor: Donor) {
    this.router.navigate(['./activity'],
      { queryParams: { donor_Id: donor.id, id: 0, 'add-activity': true }, relativeTo: this.route });
    const dialogRef = this.dialog.open(ActivityComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
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
    dialogRef.afterClosed().subscribe(() => {
      this.getDonor(this.donor.ssn);
      this.router.navigate(['./find-donor'], { queryParams: { id: this.donor.id }, relativeTo: this.route });
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
      () => {
        // this.router.navigate(['../donors'], { relativeTo: this.route });
        this.notifyService.notify('Deleted Successfully');
      },
      err => console.log(err)
    );
  }

  getDonor(ssn: string) {
    this.donorService.getDonorBySSN(ssn).subscribe(
      (data: Donor) => {
        this.donor = data;
        if (this.donor) {
          this.router.navigate(['./find-donor'], { queryParams: { id: this.donor.id }, relativeTo: this.route });
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
