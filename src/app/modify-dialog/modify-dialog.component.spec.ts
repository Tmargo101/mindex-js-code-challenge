import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Operations, ModifyOperation } from '../operations';

import { ModifyDialogComponent } from './modify-dialog.component';

describe('ModifyDialogComponent', () => {
  let component: ModifyDialogComponent;
  let fixture: ComponentFixture<ModifyDialogComponent>;

  const modOp: ModifyOperation = {
    emp: {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle',
      compensation: 0
    },
    op: Operations.Edit
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { modOp } },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should include the employee object from data.modOp', () => {
    expect(component.employee.id).toBe(1);
  });

  it('should be an edit dialog', () => {
    // Ensure the correct operation was set in the constructor
    expect(component.operation).toBe(Operations.Edit);

    // Ensure the rendered element is correct
    expect(fixture.nativeElement.textContent).toContain('Update Compensation');
  });
});
