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
  bloodGroups: { id: number, value: string }[];

  productTypes = [
    { id: 1, value: 'whole blood' },
    { id: 2, value: 'plasma' },
    { id: 3, value: 'platelet' }
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
    private bloodService: BoodGroupService,
    private bloodProductService: BloodProductService,
    public dialogRef: MatDialogRef<BloodProductComponent>
  ) { }

  ngOnInit(): void {
    this.getBloodGroups();
    this.bloodProductForm = this.fb.group({
      barcode: [null, Validators.required],
      product_type: [null, Validators.required],
      storage_location: [null, Validators.required],
      blood_group: [null, Validators.required],
      // donor_activity_id: [null, Validators.required]
    });

    // Read the product Id from the route parameter
    this.route.queryParamMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getProduct(id);
      }
    );
  }

  get barcode() { return this.bloodProductForm.get('barcode'); }
  get product_type() { return this.bloodProductForm.get('donationType'); }
  get storage_location() { return this.bloodProductForm.get('storage_location'); }
  get blood_group() { return this.bloodProductForm.get('blood_group'); }

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
        product_type: this.product.product_type,
        storage_location: this.product.storage_location,
        blood_group: this.product.blood_group
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


  getBloodGroups() {
    this.bloodService.getBloodGroups().subscribe(
      (data: { id: number, value: string }[]) => {
        this.bloodGroups = data;
      },
      err => console.log(err)
    );
  }
}
