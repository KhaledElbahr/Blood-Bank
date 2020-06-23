import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Patient } from 'src/app/core/models/patient';
import { BoodGroupService } from 'src/app/core/services/bood-group.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  pageTitle = 'Edit Patient';
  patientForm: FormGroup;
  patient: Patient;
  genders = [
    { id: 1, value: 'male' },
    { id: 2, value: 'female' }
  ];
  bloodGroups = [
    { id: 1, value: 'O+' },
    { id: 2, value: 'O-' },
    { id: 3, value: 'A+' },
    { id: 4, value: 'A-' },
    { id: 5, value: 'B+' },
    { id: 6, value: 'B-' },
    { id: 7, value: 'AB+' },
    { id: 8, value: 'AB-' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private bloodService: BoodGroupService,
    private patientService: PatientService,
    public dialogRef: MatDialogRef<PatientComponent>
  ) { }

  // , Validators.pattern('(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d)')

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      ssn: [null, [Validators.required, Validators.maxLength(14)]],
      gender: [null, Validators.required],
      blood_group_id: [null, Validators.required],
      phone: [null, [Validators.required, Validators.maxLength(11)]],
      address: [null]
    });

    // Read the Patient Id from the route parameter
    this.route.queryParamMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getPatient(id);
      }
    );
  }

  get first_name() { return this.patientForm.get('first_name'); }
  get last_name() { return this.patientForm.get('last_name'); }
  get ssn() { return this.patientForm.get('ssn'); }
  get gender() { return this.patientForm.get('gender'); }
  get blood_group_id() { return this.patientForm.get('blood_group_id'); }
  get phone() { return this.patientForm.get('phone'); }
  get address() { return this.patientForm.get('address'); }

  getPatient(id: number): void {
    this.patientService.getPatientById(id).subscribe({
      next: (patient: Patient) => {
        this.displayPatient(patient);
      },
      error: err => console.log(err)
    });
  }

  displayPatient(patient: Patient): void {
    this.patient = patient;
    if (this.patient.id === 0) {
      this.pageTitle = 'Add Patient';
    } else {
      this.pageTitle = 'Edit Patient';
    }

    // Update the data on the form
    this.patientForm.patchValue(
      {
        first_name: this.patient.first_name,
        last_name: this.patient.last_name,
        ssn: this.patient.ssn,
        gender: this.patient.gender,
        blood_group_id: this.patient.blood_group_id,
        phone: this.patient.phone,
        address: this.patient.address,
      }
    );
  }

  onSave(): void {
    if (this.patientForm.valid && this.patientForm.dirty) {
      const p = { ...this.patient, ...this.patientForm.value };
      if (p.id === 0) {
        this.patientService.addPatient(this.patientForm.value).subscribe(
          data => {
            this.onClose();
            // this.notifyService.notify(data.message);
          },
          // err => this.notifyService.notify(err)
        );
      } else {
        this.patientService.updatePatient(p).subscribe(
          data => {
            this.onClose();
            // this.notifyService.notify(data.message);

          },
          // err => this.notifyService.notify(err)
        );
      }
    } else {
      this.applyNavigation();
    }
  }

  applyNavigation() {
    this.patientForm.reset();
    this.location.back();
    // this.router.navigate(['../Patients'], { queryParams: null, relativeTo: this.route });
  }

  onCancel() {
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
      this.applyNavigation();
    });
  }


  // getBloodGroups() {
  //   this.bloodService.getBloodGroups().subscribe(
  //     (data: { id: number, value: string }[]) => {
  //       console.log(data);
  //       this.bloodGroups = data;
  //     },
  //     err => console.log(err)
  //   );
  // }
}
