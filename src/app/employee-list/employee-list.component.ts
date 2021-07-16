import {Component, OnInit, Inject} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import {Operations} from '../operations';

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
  reportToModify: Employee;

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

  openDialog(emp: Employee, op: Operations): void {
    // Open dialog and pass object
    const dialogRef = this.dialog.open(ModifyDialogComponent, {
      data: {
        employee: emp,
        operation: op
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      switch(result.op) {
        case Operations.Edit:
          console.log(`Edit ${result.emp.firstName}'s compensation: ${result.emp.compensation}`);
          this.updateCompensation(result.emp);
          break;
        case Operations.Delete:
          console.log(`Delete ${result.emp.firstName}`);
          this.removeEmployee(emp);
          break;
        default:
          break;
      }      
    });
  }

  updateCompensation(emp: Employee): void {
    this.employeeService.save(emp)
    .subscribe(() => {
      this.getAllEmployees()
    });
  }

  removeEmployee(emp: Employee): void {
    this.employeeService.remove(emp)
    .subscribe(() => {
      this.getAllEmployees();
    });
  }


  editReport(emp: Employee): void {
    console.log(`Edit employee ${emp.id}`);
    this.reportToModify = emp;
    this.openDialog(emp, Operations.Edit);
  }

  deleteReport(emp: Employee): void {
    console.log(`Delete employee ${emp.id}`);
    this.reportToModify = emp;
    this.openDialog(emp, Operations.Delete);
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
