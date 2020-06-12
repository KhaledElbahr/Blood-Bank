import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/core/models/patient';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientComponent } from '../patient/patient.component';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('patientInfo') patient: Patient;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }


  ngOnInit() {
    // let id: number;
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     id = params.id;
    //   }
    // );
    // this.patient = this.patientService.getPatient(civilId);
    // console.log(typeof(civilId));
  }

  updatePatient(patient: Patient) {
    // console.log('Not Implemented Yet!!!');
    // this.router.navigate(['../../../edit-patient',
    // { pId: this.patient.id} ], { relativeTo: this.route });

    this.router.navigate(['../../../edit-patient'],
      { queryParams: { id: `${this.patient.id}`, 'enable-edit': true }, relativeTo: this.route });
    const dialogRef = this.dialog.open(PatientComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
      data: patient
    });
    // dialogRef.afterClosed().subscribe(() => this.getVolunteers());
  }

  onDelete() {
    // console.log('Not Implemented Yet!!!');
  }
}
