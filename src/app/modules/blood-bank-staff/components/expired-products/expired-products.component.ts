import { Component, OnInit } from '@angular/core';
import { BloodProduct } from '../../models/blood-product';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BloodProductService } from '../../services/blood-product.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-expired-products',
  templateUrl: './expired-products.component.html',
  styleUrls: ['./expired-products.component.scss']
})
export class ExpiredProductsComponent implements OnInit {
  products: BloodProduct[];
  displayedColumns: string[] = [
    'barcode',
    'blood_group',
    'product_type',
    'storage_location',
    'expire_on',
    'actions'
  ];
  dataSource = new MatTableDataSource<BloodProduct>();
  searchKey: string;

  constructor(
    public dialog: MatDialog,
    private notifyService: NotificationService,
    private bloodProductService: BloodProductService) { }

  ngOnInit() { this.getExpiredProducts(); }

  applyFilter() { this.dataSource.filter = this.searchKey.trim().toLowerCase(); }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  removeExpiredProducts(product: BloodProduct): void {
    console.log(product.id);
    const confirmation = window.confirm('Remove this bag from stock?');
    if (confirmation) {
      this.deleteExpiredProducts(product);
    }
  }

  deleteExpiredProducts(product: BloodProduct) {
    this.bloodProductService.deleteProduct(product.id).subscribe(
      () => {
        this.getExpiredProducts();
        this.notifyService.notify('Deleted Successfully');
      },
      err => console.log(err)
    );
  }

  getExpiredProducts() {
    this.bloodProductService.getExpiredProducts().subscribe(
      (data: BloodProduct[]) => {
        this.products = data;
        this.dataSource = new MatTableDataSource<BloodProduct>(this.products);
      },
      err => console.log(err)
    );
  }
}
