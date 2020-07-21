import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Request } from './../../../../../core/models/request';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from './../../../services/request.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Location, formatDate } from '@angular/common';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  pageTitle = 'Edit Request';
  requestForm: FormGroup;
  request: Request;
  patientId: number;
  minDate: Date;
  productTypes = [
    { id: 1, value: 'Whole Blood' },
    { id: 2, value: 'Plasma' },
    { id: 3, value: 'Apheresis' }
  ];
  priorities = [
    { id: 1, value: 'normal' },
    { id: 2, value: 'critical' },
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
    private location: Location,
    private route: ActivatedRoute,
    private requestService: RequestService,
    private notifyService: NotificationService,
    public dialogRef: MatDialogRef<RequestComponent>) {
    // Set the minimum to Current Date
    const currentDate = new Date();
    this.minDate = new Date(currentDate);
  }

  ngOnInit(): void {
    // Read the Request from the route parameter
    this.route.queryParamMap.subscribe(
      params => {
        const id = +params.get('rId');
        this.patientId = +params.get('pId');
        this.getRequest(id);
      }
    );
    this.requestForm = this.fb.group({
      patient_id: [this.patientId, Validators.required],
      product_type_id: [null, Validators.required],
      blood_group_id: [null, Validators.required],
      quantity: [null, Validators.required],
      required_date: [null, Validators.required],
      priority: [null, Validators.required],
    });
  }

  get product_type_id() { return this.requestForm.get('product_type_id'); }
  get blood_group_id() { return this.requestForm.get('blood_group_id'); }
  get quantity() { return this.requestForm.get('quantity'); }
  get required_date() { return this.requestForm.get('required_date'); }
  get priority() { return this.requestForm.get('priority'); }

  getRequest(id: number): void {
    this.requestService.getRequest(id).subscribe(
      (data) => this.displayUser(data),
      err => console.log(err)
    );
  }

  displayUser(request: Request): void {
    this.request = request;
    console.log(this.request);
    if (this.request.id === 0) {
      this.pageTitle = 'Add Request';
    } else {
      this.pageTitle = 'Edit Request';
    }

    // Update the data on the form
    this.requestForm.patchValue(
      {
        patient_id: this.request.patient_id,
        product_type_id: this.request.product_type_id,
        blood_group_id: this.request.blood_group_id,
        quantity: this.request.quantity,
        required_date: this.request.required_date,
        priority: this.request.priority
      }
    );
  }

  onSave(): void {
    if (this.requestForm.valid && this.requestForm.dirty) {
      const r = { ...this.request, ...this.requestForm.value };
      console.log(r);
      console.log(this.requestForm.value);
      if (r.id === 0) {
        this.requestService.addRequest(this.requestForm.value).subscribe(
          data => {
            this.onClose();
            this.notifyService.notify('Created Successfully');
          },
          err => console.log(err)
        );
      } else {
        this.requestService.updateRequest(r).subscribe(
          data => {
            this.onClose();
            this.notifyService.notify('Updated Successfully');
          },
          err => console.log(err)
        );
      }
    } else {
      this.applyNavigation();
    }
  }

  applyNavigation() {
    this.requestForm.reset();
    this.location.back();
  }

  onCancel() {
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(() => {
      this.applyNavigation();
    });
  }
}
