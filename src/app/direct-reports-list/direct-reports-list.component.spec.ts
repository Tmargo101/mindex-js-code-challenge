import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectReportsListComponent } from './direct-reports-list.component';

describe('DirectReportsListComponent', () => {
  let component: DirectReportsListComponent;
  let fixture: ComponentFixture<DirectReportsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectReportsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectReportsListComponent);
    component = fixture.componentInstance;
    component.directReports = [
      {
        id: 1,
        firstName: 'first',
        lastName: 'last',
        position: 'jobTitle',
        compensation: 0
      }
    ];
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the direct report in a list', () => {
    expect(fixture.nativeElement.textContent).toContain('first last');
  });

  it('should show edit and delete buttons', () => {
    expect(fixture.nativeElement.textContent).toContain('edit');
    expect(fixture.nativeElement.textContent).toContain('delete');
  });
});
