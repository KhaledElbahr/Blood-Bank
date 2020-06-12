import { Patient } from 'src/app/core/models/patient';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PatientComponent } from './patient/patient.component';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  searchKey: string;
  findPatient = false;
  patient: Patient;
  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(PatientComponent, {
      disableClose: true,
      autoFocus: true,
      width: '35%',
    });
    this.router.navigate(['./patient'], { queryParams: { id: 0, 'add-patient': true }, relativeTo: this.route });

    // dialogRef.afterClosed().subscribe(() => this.getVolunteers());
  }

  applyFilter() {
    const ssn = this.searchKey.trim().toLowerCase();
    this.getPatient(ssn);
    if (this.patient) {
      this.router.navigate(['./patient', this.patient.id], { relativeTo: this.route });
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  getPatient(ssn: string) {
    this.patientService.getPatient(ssn).subscribe(
      (data: Patient) => {
        console.log(data);
        this.patient = data;
      },
      err => console.log(err)
    );
  }

}
