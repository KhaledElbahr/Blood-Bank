import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DonorComponent } from './layout/donor.component';
import { DonorActivitesComponent } from './components/donor-activites/donor-activites.component';


const donorRoutes: Routes = [
  {
    path: '',
    component: DonorComponent,
    children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'activities', component: DonorActivitesComponent
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(donorRoutes)],
  exports: [RouterModule]
})
export class DonorRoutingModule { }
