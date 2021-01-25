import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  page: number = 1;
  constructor(private api: AppService) { }


  paymentList: any

  ngOnInit(): void {
    this.getPaymentList();
  }

  getPaymentList() {
    this.api.callApi("http://localhost:3531/api/admin/adminListTransaction", 'POST', {}, {}).subscribe(res => {
      this.paymentList = res['data']
    })
  }

}
