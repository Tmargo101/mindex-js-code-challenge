import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ModifyDialogComponent } from './modify-dialog.component';

describe('ModifyDialogComponent', () => {
  let component: ModifyDialogComponent;
  let fixture: ComponentFixture<ModifyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDialogComponent);
    component = fixture.componentInstance;
    component.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle',
      compensation: 0
    };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
