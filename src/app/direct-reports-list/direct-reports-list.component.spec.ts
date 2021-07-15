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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
