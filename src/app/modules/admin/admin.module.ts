import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Reactive Forms Module
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Routing Module
import { AdminRoutingModule } from './admin-routing.module';
// Material Module
import { MaterialModule } from 'src/app/shared/modules/material.module';
// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileInfoComponent } from './components/dashboard/profile-info/profile-info.component';
import { EditProfileComponent } from './components/dashboard/edit-profile/edit-profile.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AdminComponent } from './layout/admin.component';
import { UserComponent } from './components/users/user/user.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentComponent } from './components/students/student/student.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    ProfileInfoComponent,
    EditProfileComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AdminComponent,
    UserComponent,
    StudentsComponent,
    StudentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class AdminModule { }
