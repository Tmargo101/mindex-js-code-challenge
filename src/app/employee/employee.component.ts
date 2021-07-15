import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() editReport = new EventEmitter<Employee>();
  @Output() deleteReport = new EventEmitter<Employee>();

  totalReports: number;
  directReports: Employee[];

  constructor(private employeeService: EmployeeService) {
    this.totalReports = 0;
    this.directReports = [];
  }

  ngOnInit(): void {
    // Get total reports (direct and indirect)
    this.getReports(this.employee);
    this.getDirectReportInformation(this.employee);
  }

  // Pass employee to edit from the direct-reports-list component to the employee-list component
  emitEditReport(emp: Employee): void {
    this.editReport.emit(emp);
  }

  // Pass employee to delete from the direct-reports-list component to the employee-list component
  emitDeleteReport(emp: Employee): void {
    this.deleteReport.emit(emp);
  }

  // Get all direct reports
  private getDirectReportInformation(employee: Employee): void {
    // Return if the passed employee has no direct reports
    if (!employee.directReports) { return; }
    
    // Get each employee in the directReports array & add them to new directReports array
    employee.directReports.forEach(e => {
      this.employeeService.get(e)
        .subscribe(report => {
          this.directReports.push(report);
        });
    });
  }

  // Recursivly get the total number of reports, directly and indirectly
  private getReports(employee: Employee): void {
    // Return if the passed employee has no direct reports
    if (!employee.directReports) { return; }

    // Add all direct reports of the passed employee to the total reports
    this.totalReports += employee.directReports.length;

    // Recursivly check for indirect reports
    employee.directReports.forEach(e => {
      this.employeeService.get(e)
        .subscribe(report => {
          this.getReports(report);
        });
    });
    
  }
}
