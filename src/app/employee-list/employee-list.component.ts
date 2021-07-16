import {Component, OnInit, Inject} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

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
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  openDialog(emp: Employee) {
    const dialogRef = this.dialog.open(ModifyDialogComponent, {
      data: {
        employee: emp
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  editReport(emp: Employee): void {
    console.log(`Edit employee ${emp.id}`);
    this.reportToModify = emp;
    this.openDialog(emp);
  }

  deleteReport(emp: Employee): void {
    console.log(`Delete employee ${emp.id}`);
    this.reportToModify = emp;
    this.openDialog(emp);
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
