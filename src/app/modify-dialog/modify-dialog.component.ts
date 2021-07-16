import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { Employee } from '../employee';
import { Operations } from '../operations';

@Component({
  selector: 'app-modify-dialog',
  templateUrl: './modify-dialog.component.html',
  styleUrls: ['./modify-dialog.component.css']
})

export class ModifyDialogComponent {  
  employee: Employee;
  operation: Operations;
  compensationField = new FormControl('');

  // Alias for Operations enum
  Operations = Operations;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ModifyDialogComponent>) {
    this.employee = data.employee;
    this.operation = data.operation
    this.compensationField.setValue(this.employee.compensation);
  }

  // Close dialog and pass back updated employee object & operation enum
  confirmOperation(): void {
    this.dialogRef.close({
      emp: this.employee,
      op: this.operation
    });
  }

  // Update employee object when the input field changes
  updateCompensation(event: any): void {
    this.employee.compensation = event.target.value;
  }

}
