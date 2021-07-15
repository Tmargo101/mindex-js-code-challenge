import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import {Employee} from '../employee';

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

  constructor() { }

  ngOnInit(): void {
  }

  editReportClicked(emp: Employee): void {
    this.editReport.emit(emp);
  }

  deleteReportClicked(emp: Employee): void {
    this.deleteReport.emit(emp);
  }
}
