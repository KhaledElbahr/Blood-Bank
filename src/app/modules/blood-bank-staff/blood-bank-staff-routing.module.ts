import { HandleRequestComponent } from './components/requests/handle-request/handle-request.component';
import { DonorInfoComponent } from './components/donors/donor-info/donor-info.component';
import { BloodProductComponent } from './components/blood-products/blood-product/blood-product.component';
import { BloodProductsComponent } from './components/blood-products/blood-products.component';
import { ActivityComponent } from './components/donor-activites/activity/activity.component';
import { DonorActivitesComponent } from './components/donor-activites/donor-activites.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BloodBankStaffComponent } from './layout/blood-bank-staff.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/dashboard/edit-profile/edit-profile.component';
import { DonorsComponent } from './components/donors/donors.component';
import { DonorComponent } from './components/donors/donor/donor.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ApprovedRequestsComponent } from './components/approved-requests/approved-requests.component';

const bbRoutes: Routes = [
  {
    path: '',
    component: BloodBankStaffComponent,
    children: [
      {
        path: 'dashboard', component: DashboardComponent, children: [
          { path: 'edit-profile', component: EditProfileComponent, canDeactivate: [] },
        ]
      },
      {
        path: 'donors', component: DonorsComponent, children: [
          { path: 'find-donor', component: DonorInfoComponent },
          { path: 'donor', component: DonorComponent, canDeactivate: [] },
          { path: 'activity', component: ActivityComponent, canDeactivate: [] },
        ]
      },
      {
        path: 'activities', component: DonorActivitesComponent, children: [
          { path: 'activity', component: ActivityComponent, canDeactivate: [] },
          { path: 'product', component: BloodProductComponent, canDeactivate: [] },
        ]
      },
      {
        path: 'products', component: BloodProductsComponent, children: [
          { path: 'product', component: BloodProductComponent, canDeactivate: [] },
        ]
      },
      {
        path: 'requests', component: RequestsComponent, children: [
          { path: 'handle-request', component: HandleRequestComponent, canDeactivate: [] },
        ]
      },
      { path: 'approved-requests', component: ApprovedRequestsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(bbRoutes)],
  exports: [RouterModule]
})
export class BloodBankStaffRoutingModule { }
