import { Request } from './../../../../../core/models/request';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestsService } from '../../../services/requests.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-handle-request',
  templateUrl: './handle-request.component.html',
  styleUrls: ['./handle-request.component.scss']
})
export class HandleRequestComponent implements OnInit {
  handleRequestForm: FormGroup;
  request: Request;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private requestService: RequestsService,
    public dialogRef: MatDialogRef<HandleRequestComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.request = data;
  }

  ngOnInit(): void {
    this.handleRequestForm = this.fb.group({
      request_id: this.request.id,
      status: 1,
      // create empty form array
      barcode: this.fb.array([])
    });
  }

  get barcode(): FormArray { return this.handleRequestForm.get('barcode') as FormArray; }

  addBarcode(): void {
    this.barcode.push(new FormControl(null, Validators.required));
  }

  deleteBarcode(index: number): void {
    this.barcode.removeAt(index);
    this.barcode.markAsDirty();
  }

  onSave(): void {
    if (this.handleRequestForm.valid && this.handleRequestForm.dirty) {
      this.requestService.confirmRequest(this.handleRequestForm.value).subscribe(
        data => {
          this.onClose();
        },
        err => console.log(err)
      );
    } else {
      this.applyNavigation();
    }
  }

  applyNavigation() {
    this.handleRequestForm.reset();
  }

  onCancel() {
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(() => {
      this.location.back();
      this.applyNavigation();
    });
  }

}
