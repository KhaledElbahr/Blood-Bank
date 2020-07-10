import { BloodProduct } from './../../../models/blood-product';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BoodGroupService } from 'src/app/core/services/bood-group.service';
import { MatDialogRef } from '@angular/material/dialog';
import { BloodProductService } from '../../../services/blood-product.service';

@Component({
  selector: 'app-blood-product',
  templateUrl: './blood-product.component.html',
  styleUrls: ['./blood-product.component.scss']
})
export class BloodProductComponent implements OnInit {
  pageTitle = 'Edit Product';
  bloodProductForm: FormGroup;
  product: BloodProduct;
  activityId: number;

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

  storageLocs = [
    { id: 1, value: 'Fridge 1' },
    { id: 2, value: 'Fridge 2' },
    { id: 3, value: 'Fridge 3' },
    { id: 4, value: 'Fridge 4' },
    { id: 5, value: 'Fridge 5' },
    { id: 6, value: 'Fridge 6' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private bloodProductService: BloodProductService,
    public dialogRef: MatDialogRef<BloodProductComponent>
  ) { }

  ngOnInit(): void {
    // Read the product Id from the route parameter
    this.route.queryParamMap.subscribe(
      params => {
        const id = +params.get('id');
        this.activityId = +params.get('activity_id');
        this.getProduct(id);
      }
    );

    this.bloodProductForm = this.fb.group({
      barcode: [null, Validators.required],
      product_type_id: [null, Validators.required],
      storage_location_id: [null, Validators.required],
      blood_group_id: [null, Validators.required],
      donor_activity_id: this.activityId
    });
  }

  get barcode() { return this.bloodProductForm.get('barcode'); }
  get product_type_id() { return this.bloodProductForm.get('product_type_id'); }
  get storage_location_id() { return this.bloodProductForm.get('storage_location_id'); }
  get blood_group_id() { return this.bloodProductForm.get('blood_group_id'); }

  getProduct(id: number): void {
    this.bloodProductService.getProduct(id).subscribe({
      next: (product: BloodProduct) => {
        this.displayProduct(product);
      },
      error: err => console.log(err)
    });
  }

  displayProduct(product: BloodProduct): void {
    this.product = product;
    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = 'Edit Product';
    }

    // Update the data on the form
    this.bloodProductForm.patchValue(
      {
        barcode: this.product.barcode,
        product_type_id: this.product.product_type_id,
        storage_location_id: this.product.storage_location_id,
        blood_group_id: this.product.blood_group_id,
        donor_activity_id: this.product.donor_activity_id
      }
    );
  }

  onSave(): void {
    if (this.bloodProductForm.valid && this.bloodProductForm.dirty) {
      const p = { ...this.product, ...this.bloodProductForm.value };
      console.log(this.bloodProductForm.value);
      console.log(p);
      if (p.id === 0) {
        this.bloodProductService.addProduct(this.bloodProductForm.value).subscribe(
          data => {
            this.onClose();
            // this.notifyService.notify(data.message);
          },
          // err => this.notifyService.notify(err)
        );
      } else {
        this.bloodProductService.updateProduct(p).subscribe(
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
    this.bloodProductForm.reset();
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
