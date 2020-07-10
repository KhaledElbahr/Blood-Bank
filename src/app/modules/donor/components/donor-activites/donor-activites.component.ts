import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DonorActivity } from 'src/app/core/models/donor-activity';
import { DonorActivityService } from 'src/app/core/services/donor-activity.service';

@Component({
  selector: 'app-donor-activites',
  templateUrl: './donor-activites.component.html',
  styleUrls: ['./donor-activites.component.scss']
})
export class DonorActivitesComponent implements OnInit {
  activities: DonorActivity[];
  viruses = [
    { id: 1, name: 'HIV' },
    { id: 2, name: 'HEPATITIS A' },
    { id: 3, name: 'HEPATITIS B' },
    { id: 4, name: 'HEPATITIS C' },
    { id: 5, name: 'H1N1' },
    { id: 6, name: 'COVID-19' }
  ];
  displayedColumns: string[] = [
    'donor_id',
    'full_name',
    'product_type',
    'viruses',
    'temperature',
    'weight',
    'height',
    'status',
  ];
  dataSource = new MatTableDataSource<DonorActivity>();
  searchKey: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private donorActivityService: DonorActivityService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getActivities();
  }

  getActivities() {
    this.donorActivityService.getDonorActivities().subscribe(
      (data: DonorActivity[]) => {
        this.activities = data;
        this.dataSource = new MatTableDataSource<DonorActivity>(this.activities);
      },
      err => console.log(err)
    );
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
}
