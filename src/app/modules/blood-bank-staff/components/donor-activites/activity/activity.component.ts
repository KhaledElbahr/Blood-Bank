import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { DonorActivity } from '../../../../../core/models/donor-activity';
import { DonorActivityService } from '../../../../../core/services/donor-activity.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  pageTitle = 'Edit Activity';
  activityForm: FormGroup;
  activity: DonorActivity;
  donorId: number;
  hasViruses: boolean;

  statuses = [
    { id: 1, value: 'accepted' },
    { id: 2, value: 'rejected' }
  ];

  productTypes = [
    { id: 1, value: 'whole blood' },
    { id: 2, value: 'plasma' },
    { id: 3, value: 'platelet' }
  ];

  bloodGroups = [
    { id: 1, value: 'O+' },
    { id: 2, value: 'O-' },
    { id: 3, value: 'A+' },
    { id: 4, value: 'A-' },
    { id: 5, value: 'B+' },
    { id: 6, value: 'B-' },
    { id: 7, value: 'AB+' },
    { id: 8, value: 'AB-' }
  ];

  DonorViruses = [
    { id: 1, name: 'HIV' },
    { id: 2, name: 'HEPATITIS A' },
    { id: 3, name: 'HEPATITIS B' },
    { id: 4, name: 'HEPATITIS C' },
    { id: 5, name: 'H1N1' },
    { id: 6, name: 'COVID-19' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private notifyService: NotificationService,
    private donorActivityService: DonorActivityService,
    public dialogRef: MatDialogRef<ActivityComponent>
  ) { }

  ngOnInit(): void {
    // Read the activity & donor Id from the route parameter
    this.route.queryParamMap.subscribe(
      params => {
        const id = +params.get('id');
        this.donorId = +params.get('donor_Id');
        this.getActivity(id);
      }
    );

    this.activityForm = this.fb.group({
      donor_id: this.donorId,
      status: [null, Validators.required],
      product_type_id: [null, Validators.required],
      viruses: [null],
      temperature: [null, Validators.required],
      weight: [null, Validators.required],
      height: [null, Validators.required],
      comments: null
    });

  }

  get status() { return this.activityForm.get('status'); }
  get product_type_id() { return this.activityForm.get('product_type_id'); }
  get viruses() { return this.activityForm.get('viruses'); }
  get temperature() { return this.activityForm.get('temperature'); }
  get weight() { return this.activityForm.get('weight'); }
  get height() { return this.activityForm.get('height'); }

  getActivity(id: number): void {
    this.donorActivityService.getActivity(id).subscribe({
      next: (activity: DonorActivity) => {
        this.displayActivity(activity);
        console.log(activity);
      },
      error: err => console.log(err)
    });
  }

  displayActivity(activity: DonorActivity): void {
    this.activity = activity;
    if (this.activity.id === 0) {
      this.pageTitle = 'Add Activity';
    } else {
      this.pageTitle = 'Edit Activity';
      if (activity.viruses.length !== 0) {
        this.hasViruses = true;
      } else {
        this.hasViruses = false;
      }
    }

    // Update the data on the form
    this.activityForm.patchValue(
      {
        donor_id: this.activity.donor_id,
        status: this.activity.status,
        product_type_id: this.activity.product_type_id,
        viruses: this.activity.viruses,
        temperature: this.activity.temperature,
        weight: this.activity.weight,
        height: this.activity.height,
        comments: this.activity.comments
      }
    );
  }

  onSave(): void {
    if (this.activityForm.valid && this.activityForm.dirty) {
      const a = { ...this.activity, ...this.activityForm.value };
      console.log(this.activityForm.value);
      console.log(a);
      if (a.id === 0) {
        this.donorActivityService.addActivity(this.activityForm.value).subscribe(
          data => {
            this.dialogRef.close();
            this.dialogRef.afterClosed().subscribe(result => {
              this.router.navigate(['./blood-bank/activities'], { queryParams: null, relativeTo: this.route });
            });
            this.notifyService.notify('Created Successfully');
          }
        );
      } else {
        this.donorActivityService.updateActivity(a).subscribe(
          data => {
            this.onClose();
            this.notifyService.notify('Updated Successfully');
          }
        );
      }
    } else {
      this.applyNavigation();
    }
  }

  applyNavigation() {
    this.activityForm.reset();
    this.location.back();
  }

  onCancel() {
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
      this.applyNavigation();
    });
  }

}
