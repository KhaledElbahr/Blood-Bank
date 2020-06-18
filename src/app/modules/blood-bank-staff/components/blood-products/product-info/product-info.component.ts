import { BloodProduct } from './../../../models/blood-product';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BloodProductComponent } from '../blood-product/blood-product.component';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('productInfo') product: BloodProduct;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit() { }

  addProduct() {
    console.log('Not Implemented Yet!!!');
  }

  updateProduct(product: BloodProduct) {
    this.router.navigate(['../../../product'],
      { queryParams: { id: `${this.product.id}`, 'enable-edit': true }, relativeTo: this.route });
    const dialogRef = this.dialog.open(BloodProductComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
      data: product
    });
  }

  onDelete() {
    // console.log('Not Implemented Yet!!!');
  }
}
