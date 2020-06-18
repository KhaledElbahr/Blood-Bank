import { ActivityComponent } from './activity/activity.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DonorActivity } from '../../models/donor-activity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DonorActivityService } from '../../services/donor-activity.service';

@Component({
  selector: 'app-donor-activites',
  templateUrl: './donor-activites.component.html',
  styleUrls: ['./donor-activites.component.scss']
})
export class DonorActivitesComponent implements OnInit {
  activities: DonorActivity[];
  displayedColumns: string[] = [
    'donor_id',
    'full_name',
    'product_type',
    'temperature',
    'weight',
    'height',
    'status',
    'comments',
    'actions'
  ];
  dataSource = new MatTableDataSource<DonorActivity>();
  searchKey: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private donorActivityService: DonorActivityService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getActivities();
  }

  onEdit(activity: DonorActivity): void {
    const id = activity.id;
    this.router.navigate(['./activity'], { queryParams: { rId: `${id}`, 'enable-edit': true }, relativeTo: this.route });
    const dialogRef = this.dialog.open(ActivityComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
      data: activity
    });
    dialogRef.afterClosed().subscribe(() => this.getActivities());
  }

  onDelete(activity: DonorActivity): void {
    console.log(activity.id);
    const confirmation = window.confirm('Are you sure you want to remove this Activity?');
    if (confirmation) {
      this.deleteRequest(activity);
    }
  }

  getActivities() {
    this.donorActivityService.getActivities().subscribe(
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

  deleteRequest(activity: DonorActivity) {
    this.donorActivityService.deleteActivity(activity.id).subscribe(
      () => this.getActivities(),
      err => console.log(err)
    );
  }
}
