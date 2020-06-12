import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BloodBankStaffComponent } from './layout/blood-bank-staff.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/dashboard/edit-profile/edit-profile.component';

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
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(bbRoutes)],
  exports: [RouterModule]
})
export class BloodBankStaffRoutingModule { }
