import { BloodProduct } from './../../../models/blood-product';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BloodProductComponent } from '../blood-product/blood-product.component';
import { BloodProductService } from '../../../services/blood-product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('productInfo') product: BloodProduct;

  constructor(
    private bloodProductService: BloodProductService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit() { }

  addProduct() {
    console.log('Not Implemented Yet!!!');
  }

  updateProduct(product: BloodProduct) {
    this.router.navigate(['./product'],
      { queryParams: { id: `${this.product.id}`, 'enable-edit': true }, relativeTo: this.route });
    const dialogRef = this.dialog.open(BloodProductComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
      data: product
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getProduct(this.product.barcode);
      this.router.navigate(['./product'], { queryParams: { id: this.product.id }, relativeTo: this.route });
    });
  }

  onDelete(product: BloodProduct): void {
    console.log(product.id);
    const confirmation = window.confirm('Are you sure you want to remove this Product?');
    if (confirmation) {
      this.delete(product);
    }
  }

  delete(product: BloodProduct) {
    this.bloodProductService.deleteProduct(product.id).subscribe(
      () => {
        this.router.navigate(['../products'], { relativeTo: this.route });
        console.log('Product Deleted Successfully');
      },
      err => console.log(err)
    );
  }

  getProduct(barcode: string) {
    this.bloodProductService.getProductByBarcode(barcode).subscribe(
      (data: BloodProduct) => {
        this.product = data;
      },
      err => console.log(err)
    );
  }
}
