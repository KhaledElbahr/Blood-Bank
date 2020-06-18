import { BloodProduct } from './../../models/blood-product';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BloodProductComponent } from './blood-product/blood-product.component';
import { BloodProductService } from '../../services/blood-product.service';

@Component({
  selector: 'app-blood-products',
  templateUrl: './blood-products.component.html',
  styleUrls: ['./blood-products.component.scss']
})
export class BloodProductsComponent implements OnInit {
  searchKey: string;
  findProduct = false;
  product: BloodProduct;
  hasProduct: Observable<boolean>;
  constructor(
    private bloodProductService: BloodProductService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(BloodProductComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
    });
    this.router.navigate(['./product'], { queryParams: { id: 0, 'add-product': true }, relativeTo: this.route });
  }

  applyFilter() {
    const unitNo = this.searchKey.trim().toLowerCase();
    this.getProduct(unitNo);
    if (this.product) {
      this.router.navigate(['./product', this.product.id], { relativeTo: this.route });
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  getProduct(unitNo: string) {
    this.bloodProductService.getProduct(unitNo).subscribe(
      (data: BloodProduct) => {
        this.product = data;
        this.hasProduct = of(true);
      },
      err => {
        console.log(err);
        this.hasProduct = of(false);
      }
    );
  }
}
