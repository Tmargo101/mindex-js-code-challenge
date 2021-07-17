import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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

  // Alias for Operations enum
  Operations = Operations;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ModifyDialogComponent>) {
    this.employee = data.modOp.emp;
    this.operation = data.modOp.op;
  }

  // Close dialog and pass back updated employee object & operation enum
  confirmOperation(): void {
    this.dialogRef.close({
      emp: this.employee,
      op: this.operation
    });
  }
}
