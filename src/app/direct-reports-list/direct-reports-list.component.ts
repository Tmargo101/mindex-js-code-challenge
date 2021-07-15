import { Component, Input, OnInit } from '@angular/core';

import {Employee} from '../employee';

@Component({
  selector: 'app-direct-reports-list',
  templateUrl: './direct-reports-list.component.html',
  styleUrls: ['./direct-reports-list.component.css']
})
export class DirectReportsListComponent implements OnInit {

  @Input() directReports: Employee[];

  constructor() { }

  ngOnInit(): void {
  }

}
