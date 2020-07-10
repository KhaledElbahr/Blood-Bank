import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonorRoutingModule } from './donor-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DonorComponent } from './layout/donor.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ProfileInfoComponent } from './components/dashboard/profile-info/profile-info.component';
import { DonorActivitesComponent } from './components/donor-activites/donor-activites.component';

@NgModule({
  declarations: [
    DonorComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    ProfileInfoComponent,
    DonorActivitesComponent
  ],
  imports: [
    CommonModule,
    DonorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class DonorModule { }
