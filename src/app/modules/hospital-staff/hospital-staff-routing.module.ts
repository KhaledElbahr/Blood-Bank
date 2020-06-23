import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalComponent } from './layout/hospital.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/dashboard/edit-profile/edit-profile.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientComponent } from './components/patients/patient/patient.component';

const hStaffRoutes: Routes = [
  {
    path: '',
    component: HospitalComponent,
    children: [
      {
        path: 'dashboard', component: DashboardComponent, children: [
          { path: 'edit-profile', component: EditProfileComponent, canDeactivate: [] },
        ]
      },
      {
        path: 'patients', component: PatientsComponent, children: [
          { path: 'patient', component: PatientComponent, canDeactivate: [] },
        ]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(hStaffRoutes)],
  exports: [RouterModule]
})
export class HospitalStaffRoutingModule { }
