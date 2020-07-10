import { UserComponent } from './components/users/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin.component';
import { EditProfileComponent } from './components/dashboard/edit-profile/edit-profile.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentComponent } from './components/students/student/student.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard', component: DashboardComponent, children: [
          { path: 'edit-profile', component: EditProfileComponent, canDeactivate: [] },
        ]
      },
      {
        path: 'users', component: UsersComponent, children: [
          { path: 'user', component: UserComponent, canDeactivate: [] },
        ]
      },
      {
        path: 'students', component: StudentsComponent, children: [
          { path: 'upload-student', component: StudentComponent, canDeactivate: [] },
        ]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
