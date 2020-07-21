import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/core/services/patient.service';
import { Patient } from 'src/app/core/models/patient';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  searchKey: string;
  findPatient = false;
  patient: Patient;
  HasPatient = true;
  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  applyFilter() {
    const ssn = this.searchKey.trim().toLowerCase();
    this.getPatient(ssn);
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  getPatient(ssn: string) {
    this.patientService.getPatientBySSN(ssn).subscribe(
      (data: Patient) => {
        this.patient = data;
        if (this.patient) {
          this.router.navigate(['./patient'], { queryParams: { id: this.patient.id }, relativeTo: this.route });
        }
        this.HasPatient = true;
      },
      err => {
        console.log(err.error.message);
        this.HasPatient = false;
      }
    );
  }

}
