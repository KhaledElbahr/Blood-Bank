import { PatientService } from 'src/app/core/services/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/core/models/patient';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientComponent } from '../patient/patient.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('patientInfo') patient: Patient;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private notifyService: NotificationService,
    private dialog: MatDialog) { }


  ngOnInit() { }

  updatePatient(patient: Patient) {
    this.router.navigate(['./patient'],
      { queryParams: { id: this.patient.id, 'enable-edit': true }, relativeTo: this.route });
    const dialogRef = this.dialog.open(PatientComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
      data: patient
    });
  }

  onDelete(patient: Patient): void {
    console.log(patient.id);
    const confirmation = window.confirm('Are you sure you want to remove this Patient?');
    if (confirmation) {
      this.delete(patient);
    }
  }

  delete(patient: Patient) {
    this.patientService.deletePatient(patient.id).subscribe(
      () => this.notifyService.notify('Deleted Successfully'),
      err => console.log(err)
    );
  }
}
