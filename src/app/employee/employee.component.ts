import {Component, Input, OnInit} from '@angular/core';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
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

  // Get all direct reports
  private getDirectReportInformation(employee: Employee): void {
    if (!employee.directReports) { return; }

    employee.directReports.forEach(e => {
      this.employeeService.get(e)
        .subscribe(report => {
          this.directReports.push(report);
        });
    });
  }

  // Recursivly get the total number of reports, directly and indirectly
  private getReports(employee: Employee): void {

    // Return if no direct reports of the passed employee are found
    if (!employee.directReports) { return; }

    // Add all direct reports of the currently passed employee
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
