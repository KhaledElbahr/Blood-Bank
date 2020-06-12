import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BloodBankStaffRoutingModule } from './blood-bank-staff-routing.module';
import { BloodBankStaffComponent } from './layout/blood-bank-staff.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileInfoComponent } from './components/dashboard/profile-info/profile-info.component';
import { EditProfileComponent } from './components/dashboard/edit-profile/edit-profile.component';

@NgModule({
  declarations: [BloodBankStaffComponent, HeaderComponent, FooterComponent, SidebarComponent, DashboardComponent, ProfileInfoComponent, EditProfileComponent],
  imports: [
    CommonModule,
    BloodBankStaffRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class BloodBankStaffModule { }
