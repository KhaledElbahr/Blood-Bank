import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Patient } from 'src/app/core/models/patient';
import { RequestComponent } from '../../requests/request/request.component';

@Component({
  selector: 'app-doctor-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('patientInfo') patient: Patient;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
  }

  addRequest() {
    this.router.navigate(['./request'],
      {
        queryParams: { pId: this.patient.id, rId: 0, 'add-request': true },
        relativeTo: this.route
      });
    const dialogRef = this.dialog.open(RequestComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
    });
  }
}
