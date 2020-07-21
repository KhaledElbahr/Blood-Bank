import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/modules/auth/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  selectedFile: File;
  ACCESS_TOKEN: string = this.auth.ACCESS_TOKEN;
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.ACCESS_TOKEN}`
  });

  constructor(
    private location: Location,
    private http: HttpClient,
    private auth: AuthService,
    private notifyService: NotificationService,
    public dialogRef: MatDialogRef<StudentComponent>) { }

  ngOnInit(): void { }

  onChooseFile(event) {
    this.selectedFile = event.target.files[0];
  }

  onUploadFile() {
    const uploadData = new FormData();
    uploadData.append('select_file', this.selectedFile, this.selectedFile.name);
    return this.http.post('http://127.0.0.1:8000/api/import_excel/import/', uploadData, { headers: this.headers }).pipe(
      map((data: any) => data),
      catchError(err => throwError(err))
    ).subscribe(() => {
      this.notifyService.notify('Uploaded Successfully');
      this.onClose();
    },
      err => this.notifyService.notify('Something goes wrong!!')
    );
  }

  onCancel() {
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
      this.location.back();
    });
  }

}
