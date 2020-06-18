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
import { DonorsComponent } from './components/donors/donors.component';
import { DonorComponent } from './components/donors/donor/donor.component';
import { DonorInfoComponent } from './components/donors/donor-info/donor-info.component';
import { DonorActivitesComponent } from './components/donor-activites/donor-activites.component';
import { ActivityComponent } from './components/donor-activites/activity/activity.component';
import { BloodProductsComponent } from './components/blood-products/blood-products.component';
import { BloodProductComponent } from './components/blood-products/blood-product/blood-product.component';
import { ProductInfoComponent } from './components/blood-products/product-info/product-info.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ApprovedRequestsComponent } from './components/approved-requests/approved-requests.component';

@NgModule({
  declarations: [
    BloodBankStaffComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    ProfileInfoComponent,
    EditProfileComponent,
    DonorsComponent,
    DonorComponent,
    DonorInfoComponent,
    DonorActivitesComponent,
    ActivityComponent,
    BloodProductsComponent,
    BloodProductComponent,
    ProductInfoComponent,
    RequestsComponent,
    ApprovedRequestsComponent
  ],
  imports: [
    CommonModule,
    BloodBankStaffRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class BloodBankStaffModule { }
