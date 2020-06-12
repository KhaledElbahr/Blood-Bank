import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Reactive Forms Module
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Routing Module
import { HospitalStaffRoutingModule } from './hospital-staff-routing.module';
// Material Module
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HospitalComponent } from './layout/hospital.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientComponent } from './components/patients/patient/patient.component';
import { ProfileInfoComponent } from './components/dashboard/profile-info/profile-info.component';
import { EditProfileComponent } from './components/dashboard/edit-profile/edit-profile.component';
import { PatientInfoComponent } from './components/patients/patient-info/patient-info.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HospitalComponent,
    DashboardComponent,
    PatientsComponent,
    PatientComponent,
    ProfileInfoComponent,
    EditProfileComponent,
    PatientInfoComponent
  ],
  imports: [
    CommonModule,
    HospitalStaffRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class HospitalStaffModule { }
