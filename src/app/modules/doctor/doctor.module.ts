import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Reactive Forms Module
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Routing Module
import { DoctorRoutingModule } from './doctor-routing.module';
// Material Module
import { MaterialModule } from 'src/app/shared/modules/material.module';

import { DoctorComponent } from './layout/doctor.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsComponent } from './components/patients/patients.component';
import { RequestsComponent } from './components/requests/requests.component';
import { RequestComponent } from './components/requests/request/request.component';
import { ProfileInfoComponent } from './components/dashboard/profile-info/profile-info.component';
import { EditProfileComponent } from './components/dashboard/edit-profile/edit-profile.component';
import { PatientComponent } from './components/patients/patient/patient.component';


@NgModule({
  declarations: [
    DoctorComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    PatientsComponent,
    RequestsComponent,
    RequestComponent,
    ProfileInfoComponent,
    EditProfileComponent,
    PatientComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class DoctorModule { }
