import { Component, Inject, Input, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Employee } from '../employee';
import { Operations } from '../operations';

@Component({
  selector: 'app-modify-dialog',
  templateUrl: './modify-dialog.component.html',
  styleUrls: ['./modify-dialog.component.css']
})

export class ModifyDialogComponent implements OnInit {  
  employee: Employee;
  operation: Operations;

  // Alias for Operations enum
  Operations = Operations;

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.employee = data.employee;
    this.operation = data.operation
  }

  ngOnInit(): void {
  }

}
