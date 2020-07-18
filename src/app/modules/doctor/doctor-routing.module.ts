import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from './layout/doctor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/dashboard/edit-profile/edit-profile.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientComponent } from './components/patients/patient/patient.component';
import { RequestsComponent } from './components/requests/requests.component';
import { RequestComponent } from './components/requests/request/request.component';


const doctorRoutes: Routes = [
  {
    path: '',
    component: DoctorComponent,
    children: [
      {
        path: 'dashboard', component: DashboardComponent, children: [
          { path: 'edit-profile', component: EditProfileComponent, canDeactivate: [] },
        ]
      },
      {
        path: 'patients', component: PatientsComponent, children: [
          { path: 'patient', component: PatientComponent },
          { path: 'request', component: RequestComponent, canDeactivate: [] }
        ]
      },
      {
        path: 'requests', component: RequestsComponent, children: [
          { path: 'request', component: RequestComponent, canDeactivate: [] },
        ]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(doctorRoutes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
