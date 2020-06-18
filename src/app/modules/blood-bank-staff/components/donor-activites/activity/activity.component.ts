import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BoodGroupService } from 'src/app/core/services/bood-group.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { DonorActivity } from '../../../models/donor-activity';
import { DonorActivityService } from '../../../services/donor-activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  pageTitle = 'Edit Activity';
  activityForm: FormGroup;
  activity: DonorActivity;
  bloodGroups: { id: number, value: string }[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private bloodService: BoodGroupService,
    private donorActivityService: DonorActivityService,
    public dialogRef: MatDialogRef<ActivityComponent>
  ) { }
  statuses = [
    { id: 1, value: 'accepted' },
    { id: 2, value: 'rejected' }
  ];

  productTypes = [
    { id: 1, value: 'whole blood' },
    { id: 2, value: 'plasma' },
    { id: 3, value: 'platelet' }
  ];

  DonorViruses = [
    { id: 1, value: 'HIV' },
    { id: 2, value: 'HEPATITIS A' },
    { id: 3, value: 'HEPATITIS B' },
    { id: 4, value: 'HEPATITIS C' },
    { id: 5, value: 'H1N1' },
    { id: 6, value: 'COVID-19' }
  ];

  ngOnInit(): void {
    this.getBloodGroups();
    this.activityForm = this.fb.group({
      status: [null, Validators.required],
      product_type: [null, Validators.required],
      viruses: [null],
      temp: [null, Validators.required],
      weight: [null, Validators.required],
      height: [null, Validators.required],
    });

    // Read the activity Id from the route parameter
    this.route.queryParamMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getActivity(id);
      }
    );
  }

  get status() { return this.activityForm.get('status'); }
  get product_type() { return this.activityForm.get('donationType'); }
  get viruses() { return this.activityForm.get('viruses'); }
  get temp() { return this.activityForm.get('temp'); }
  get weight() { return this.activityForm.get('weight'); }
  get height() { return this.activityForm.get('height'); }

  getActivity(id: number): void {
    this.donorActivityService.getActivity(id).subscribe({
      next: (activity: DonorActivity) => {
        this.displayActivity(activity);
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
    }

    // Update the data on the form
    this.activityForm.patchValue(
      {
        status: this.activity.status,
        product_type: this.activity.product_type,
        viruses: this.activity.viruses,
        temp: this.activity.temp,
        weight: this.activity.weight,
        height: this.activity.height
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
            this.onClose();
            // this.notifyService.notify(data.message);
          },
          // err => this.notifyService.notify(err)
        );
      } else {
        this.donorActivityService.updateActivity(a).subscribe(
          data => {
            this.onClose();
            // this.notifyService.notify(data.message);

          },
          // err => this.notifyService.notify(err)
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


  getBloodGroups() {
    this.bloodService.getBloodGroups().subscribe(
      (data: { id: number, value: string }[]) => {
        this.bloodGroups = data;
      },
      err => console.log(err)
    );
  }

}
