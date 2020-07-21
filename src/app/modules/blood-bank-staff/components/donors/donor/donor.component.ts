import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { DonorService } from '../../../../../core/services/donor.service';
import { Location } from '@angular/common';
import { Donor } from 'src/app/core/models/donor';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.scss']
})
export class DonorComponent implements OnInit {
  pageTitle = 'Edit Donor';
  donorForm: FormGroup;
  donor: Donor;
  genders = [
    { id: 1, value: 'male' },
    { id: 2, value: 'female' }
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private donorService: DonorService,
    private notifyService: NotificationService,
    public dialogRef: MatDialogRef<DonorComponent>
  ) { }

  ngOnInit(): void {
    this.donorForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      ssn: [null, Validators.required],
      gender: [null, Validators.required],
      blood_group_id: [null, Validators.required],
      email: [null],
      phone: [null, [Validators.required, Validators.maxLength(11)]],
    });

    // Read the Donor Id from the route parameter
    this.route.queryParamMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getDonor(id);
      }
    );
  }

  get first_name() { return this.donorForm.get('first_name'); }
  get last_name() { return this.donorForm.get('last_name'); }
  get ssn() { return this.donorForm.get('ssn'); }
  get gender() { return this.donorForm.get('gender'); }
  get blood_group_id() { return this.donorForm.get('blood_group_id'); }
  get email() { return this.donorForm.get('email'); }
  get phone() { return this.donorForm.get('phone'); }

  getDonor(id: number): void {
    this.donorService.getDonor(id).subscribe({
      next: (donor: Donor) => {
        this.displayDonor(donor);
      },
      error: err => console.log(err)
    });
  }

  displayDonor(donor: Donor): void {
    this.donor = donor;
    if (this.donor.id === 0) {
      this.pageTitle = 'Add Donor';
    } else {
      this.pageTitle = 'Edit Donor';
    }

    // Update the data on the form
    this.donorForm.patchValue(
      {
        first_name: this.donor.first_name,
        last_name: this.donor.last_name,
        ssn: this.donor.ssn,
        gender: this.donor.gender,
        blood_group_id: this.donor.blood_group_id,
        email: this.donor.email,
        phone: this.donor.phone,
      }
    );
  }

  onSave(): void {
    if (this.donorForm.valid && this.donorForm.dirty) {
      const d = { ...this.donor, ...this.donorForm.value };
      console.log(this.donorForm.value);
      console.log(d);
      if (d.id === 0) {
        this.donorService.addDonor(this.donorForm.value).subscribe(
          data => {
            this.onClose();
            this.notifyService.notify('Created Successfully');
          }
        );
      } else {
        this.donorService.updateDonor(d).subscribe(
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
    this.donorForm.reset();
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
