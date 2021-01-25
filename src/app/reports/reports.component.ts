import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  page: number = 1;

  filterForm = new FormGroup({
    driver: new FormControl(''),
    type: new FormControl(''),
    paymentStatus: new FormControl(''),
    daterange: new FormControl('')
  });

  selected: any;


  driverList: any = 0
  totalDriver: any = 0;
  totalJob: any = 0;
  completedJob: any = 0;
  PendingJob: any = 0;
  ongoingJob: any = 0;
  upcomingJob: any = 0;
  list: any = [];

  constructor(private api: AppService, private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    this.getReport();
  }

  getFlterReport() {
    console.log('filterData', this.filterForm, this.filterForm.value)

    const { value } = this.filterForm
    let params: any = {};
    if (value.daterange.endDate) {
      params["endDate"] = moment(value.daterange.endDate).format('DD-MM-YYYY')
    }
    if (value.daterange.startDate) {
      params['startDate'] = moment(value.daterange.startDate).format('DD-MM-YYYY')
    }
    if (value.type) {
      params['type'] = value.type
    }
    if (value.paymentStatus) {
      params['paymentStatus'] = value.paymentStatus
    }
    if (value.driver) {
      params['driver'] = value.driver
    }
    this.getReport(params)

  }


  getReport(params?: any) {
    console.log('params', params)
    this.api.callApi(`${environment.backendBaseURL}/api/admin/generatreports`, 'POST', {}, { params }).subscribe(res => {
      this.driverList = res['data'].driverList
      this.totalDriver = res['data'].totalDriver
      this.totalJob = res['data'].totalJobs
      this.completedJob = res['data'].completedJob
      this.PendingJob = res['data'].pendingJob
      this.ongoingJob = res['data'].Ongoing
      this.upcomingJob = res['data'].upcoming
      this.list = res['data'].list

      console.log('hello', res['data'].list)
    })
  }
}
