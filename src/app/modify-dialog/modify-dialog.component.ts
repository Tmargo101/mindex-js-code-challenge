import { Component, Inject, Input, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Employee } from '../employee';

@Component({
  selector: 'app-modify-dialog',
  templateUrl: './modify-dialog.component.html',
  styleUrls: ['./modify-dialog.component.css']
})
export class ModifyDialogComponent implements OnInit {

  employee: Employee;
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.employee = data.employee;
  }

  ngOnInit(): void {
  }

}
