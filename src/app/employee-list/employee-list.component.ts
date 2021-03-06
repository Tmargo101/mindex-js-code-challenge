import {Component, OnInit} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

import {ModifyOperation, Operations} from '../operations';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import {ModifyDialogComponent} from '../modify-dialog/modify-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  // Get all employees and update component array variable
  getAllEmployees(): void {
    this.employeeService.getAll()
    .pipe(
      reduce((emps, e: Employee) => emps.concat(e), []),
      map(emps => this.employees = emps),
      catchError(this.handleError.bind(this))
    ).subscribe();
  }

  openDialog(modOp: ModifyOperation): void {
    // Open dialog and pass the ModifyOperation object
    const dialogRef = this.dialog.open(ModifyDialogComponent, {
      data: {
        modOp: modOp
      }
    });

    // Handle the return data from the dialog when clsoed
    dialogRef.afterClosed().subscribe(result => {
      switch (result.op) {
        case Operations.Edit:
          this.updateCompensation(result.emp);
          break;
        case Operations.Delete:
          this.removeEmployee(result.emp, modOp.man);
          break;
        default:
          break;
      }
    });
  }

  // POST updated Employee object to API & refresh the employee list to reflect the changes
  updateCompensation(emp: Employee): void {
    this.employeeService.save(emp)
    .pipe(
      catchError(this.handleError.bind(this))
    )
    .subscribe(() => {
      this.getAllEmployees();
    });
  }

  // DELETE the Employee object from API & refresh the employee list to reflect the changes
  removeEmployee(emp: Employee, man: Employee): void {

    // Remove the employee object
    this.employeeService.remove(emp)
    .pipe(
      catchError(this.handleError.bind(this))
    )
    .subscribe(() => {
      // Remove the employee ID from the manager's directReports array
      man.directReports = man.directReports.filter(empToRemove => empToRemove !== emp.id);

      // Update the manager's directReports array
      this.employeeService.save(man)
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .subscribe(() => {
        // Refresh the employee list
        this.getAllEmployees();
      });
    });
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve data';
  }
}
