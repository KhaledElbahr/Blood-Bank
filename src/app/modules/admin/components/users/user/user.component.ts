import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin.service';
import { User } from 'src/app/core/models/user';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  pageTitle = 'Edit User';
  userForm: FormGroup;
  user: User;
  genders = [
    { id: 1, value: 'male' },
    { id: 2, value: 'female' }
  ];
  userTypes = [
    { id: 1, value: 'Admin' },
    { id: 2, value: 'Blood Bank Staff' },
    { id: 3, value: 'Hopitial Staff' },
    { id: 4, value: 'Doctor' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private adminService: AdminService,
    private notifyService: NotificationService,
    public dialogRef: MatDialogRef<UserComponent>) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      gender: [null, Validators.required],
      user_type_id: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
    });

    // Read the user Id from the route parameter
    this.route.queryParamMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getUser(id);
      }
    );
  }

  get first_name() { return this.userForm.get('first_name'); }
  get last_name() { return this.userForm.get('last_name'); }
  get gender() { return this.userForm.get('gender'); }
  get user_type_id() { return this.userForm.get('user_type_id'); }
  get email() { return this.userForm.get('email'); }
  get phone() { return this.userForm.get('phone'); }

  getUser(id: number): void {
    this.adminService.getUser(id).subscribe(
      (data) => this.displayUser(data),
      err => console.log(err)
    );
  }

  displayUser(user: User): void {
    this.user = user;
    if (this.user.id === 0) {
      this.pageTitle = 'Add User';
    } else {
      this.pageTitle = 'Edit User';
    }

    // Update the data on the form
    this.userForm.patchValue(
      {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        gender: this.user.gender,
        user_type_id: this.user.user_type_id,
        email: this.user.email,
        phone: this.user.phone
      }
    );
  }

  onSave(): void {
    if (this.userForm.valid && this.userForm.dirty) {
      const u = { ...this.user, ...this.userForm.value };
      console.log(this.userForm.value);
      if (u.id === 0) {
        this.adminService.addUser(this.userForm.value).subscribe(
          data => {
            this.onClose();
            this.notifyService.notify('Created Successfully');
          },
          err => console.log(err)
        );
      } else {
        this.adminService.updateUser(u).subscribe(
          data => {
            this.onClose();
            this.notifyService.notify('Updated Successfully');
          },
          err => console.log(err)
        );
      }
    } else {
      this.applyNavigation();
    }
  }

  applyNavigation() { this.userForm.reset(); }

  onCancel() { this.onClose(); }

  onClose(): void {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(() => {
      this.location.back();
      this.applyNavigation();
    });
  }

}
