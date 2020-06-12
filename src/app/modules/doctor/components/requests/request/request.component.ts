import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Request } from './../../../models/request';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from './../../../services/request.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { BoodGroupService } from 'src/app/core/services/bood-group.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  pageTitle = 'Edit Request';
  requestForm: FormGroup;
  request: Request;
  productTypes: [
    { id: 1, value: 'Whole Blood' },
    { id: 2, value: 'Apheresis' }
  ];
  priorities: [
    { id: 1, value: 'normal' },
    { id: 2, value: 'critical' },
  ];
  bloodGroups: { id: number, value: string }[];
  minDate: Date;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private bloodService: BoodGroupService,
    private requestService: RequestService,
    public dialogRef: MatDialogRef<RequestComponent>) {
    // Set the minimum to January 1st 2020
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear, 0, 1);
  }

  ngOnInit(): void {
    this.getBloodGroups();
    this.requestForm = this.fb.group({
      patient_id: [null, Validators.required],
      product_type: [null, Validators.required],
      blood_group: [null, Validators.required],
      quantity: [null, Validators.required],
      required_date: [null, Validators.required],
      priority: [null, Validators.required],
    });

    // Read the Request Id from the route parameter
    this.route.queryParamMap.subscribe(
      params => {
        const id = +params.get('rId');
        this.getRequest(id);
      }
    );
  }

  get product_type() { return this.requestForm.get('product_type'); }
  get blood_group() { return this.requestForm.get('blood_group'); }
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
    if (this.request.id === 0) {
      this.pageTitle = 'Add Request';
    } else {
      this.pageTitle = 'Edit Request';
    }

    // Update the data on the form
    this.requestForm.patchValue(
      {
        product_type: this.request.product_type.id,
        blood_group: this.request.blood_group.id,
        quantity: this.request.quantity,
        required_date: this.request.required_date,
        priority: this.request.priority.id
      }
    );
  }

  onSave(): void {
    if (this.requestForm.valid && this.requestForm.dirty) {
      const r = { ...this.request, ...this.requestForm.value };
      console.log(r);
      if (r.id === 0) {
        this.requestService.addRequest(r).subscribe(
          data => {
            this.onClose();
          },
          err => console.log(err)
        );
      } else {
        this.requestService.updateRequest(r).subscribe(
          data => {
            this.onClose();
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

  getBloodGroups() {
    this.bloodService.getBloodGroups().subscribe(
      (data: { id: number, value: string }[]) => {
        console.log(data);
        this.bloodGroups = data;
      },
      err => console.log(err)
    );
  }

}
