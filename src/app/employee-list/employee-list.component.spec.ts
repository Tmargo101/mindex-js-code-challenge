import {async, TestBed} from '@angular/core/testing';
import {Component, Input, NgModule} from '@angular/core';

import {EmployeeListComponent} from './employee-list.component';
import {EmployeeService} from '../employee.service';

import {MatDialog} from '@angular/material/dialog';
import { of } from 'rxjs';

@Component({selector: 'app-employee', template: ''})
class EmployeeComponent {
  @Input() employee: any;
}

@Component({selector: 'app-mat-grid-list', template: ''})
class GridListComponent {
}

@Component({selector: 'app-mat-grid-tile', template: ''})
class GridTileComponent {
}

export class MatDialogMock {
  open() {
   return {
     afterClosed: () => of(true)
   };
 }
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);


describe('EmployeeListComponent', () => {
  beforeEach(async(() => {
    const matDialog = new MatDialogMock();
    TestBed.configureTestingModule({
      declarations: [
        EmployeeListComponent,
        EmployeeComponent,
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy},
        {provide: MatDialog, useValue: matDialog}
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  }));
});
