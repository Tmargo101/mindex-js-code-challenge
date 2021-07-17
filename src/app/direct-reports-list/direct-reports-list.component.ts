import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import {Employee} from '../employee';
import { ModifyOperation, Operations } from '../operations';

@Component({
  selector: 'app-direct-reports-list',
  templateUrl: './direct-reports-list.component.html',
  styleUrls: ['./direct-reports-list.component.css']
})
export class DirectReportsListComponent implements OnInit {

  @Input() directReports: Employee[];
  @Output() directReportsChange = new EventEmitter<Employee[]>();
  @Output() editReport = new EventEmitter<Employee>();
  @Output() deleteReport = new EventEmitter<Employee>();
  @Output() modifyReport = new EventEmitter<ModifyOperation>();

  // Alias for Operations enum
  Operations = Operations;

  constructor() { }

  ngOnInit(): void {
  }

  emitModifyReport(emp: Employee, op: Operations): void {
    this.modifyReport.emit({
      emp: emp,
      op: op
    });
  }

  editReportClicked(emp: Employee): void {
    this.editReport.emit(emp);
  }

  deleteReportClicked(emp: Employee): void {
    this.deleteReport.emit(emp);
  }
}
