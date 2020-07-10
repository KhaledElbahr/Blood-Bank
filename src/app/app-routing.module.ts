import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './shared/modules/auth/components/login/login.component';
import { LoginAuthGuard } from './shared/modules/auth/services/login-auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: 'change-password', component: ChangePasswordComponent },
  {
    path: 'admin',
    canLoad: [LoginAuthGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'blood-bank',
    canLoad: [LoginAuthGuard],
    loadChildren: () => import('./modules/blood-bank-staff/blood-bank-staff.module').then(m => m.BloodBankStaffModule),
  },
  {
    path: 'doctor',
    canLoad: [LoginAuthGuard],
    loadChildren: () => import('./modules/doctor/doctor.module').then(m => m.DoctorModule),
  },
  {
    path: 'hospital',
    canLoad: [LoginAuthGuard],
    loadChildren: () => import('./modules/hospital-staff/hospital-staff.module').then(m => m.HospitalStaffModule),
  },
  {
    path: 'donor',
    canLoad: [LoginAuthGuard],
    loadChildren: () => import('./modules/donor/donor.module').then(m => m.DonorModule),
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
