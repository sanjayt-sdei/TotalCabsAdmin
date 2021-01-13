import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
// import { Color, BaseChartDirective, Label, MultiDataSet } from 'ng2-charts';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

// import * as $ from 'jquery'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  

  constructor(private modalService: BsModalService) {

  }

  ngOnInit(): void {
    
  }

}
