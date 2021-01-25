import { environment } from './../../../environments/environment';
import { AppService } from './../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import * as html2pdf from "html2pdf.js";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})


export class InvoiceComponent implements OnInit {
  constructor(
    private activateRoute: ActivatedRoute,
    private api: AppService
  ) { }

  payentDetails: any
  transactionId: String
  env: any = environment.imageurl

  @ViewChild('printableArea') printableArea: ElementRef;


  ngOnInit(): void {
    const { snapshot } = this.activateRoute;
    const { params } = snapshot;
    const { id } = params;
    this.transactionId = id
    this.getPaymentDetails(id)
  }

  getPaymentDetails(id: String) {
    this.api.callApi(`${env.backendBaseURL}/api/admin/adminTransaction/${id}`, 'POST', {}, {}).subscribe(res => {
      if (res['data']) {
        const { type, status, fare, tax, Amount, jobid, _id: transactionID } = res['data'];
        const { pickupLocation, dropLocation, distance, dateOfJourney, pickUptime, riderdetails, driverdetails, } = jobid
        this.payentDetails = { transactionID, type, status, fare, tax, Amount, distance, dateOfJourney, pickUptime, pickupLocation, dropLocation, riderdetails, driverdetails }
        console.log('this is data', this.payentDetails)
      }
    })
  }

  printInvoice(id) {
    console.log('aaa', id)
    // var data = document.getElementById(id);
    const option = {
      margin: [-1, .5, .5, .5],
      filename: 'newtype.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, height: 1000 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'p' }
    }

    // const content: Element = document.getElementById('printableArea');

    html2pdf().from(this.printableArea.nativeElement).set(option).save();
  }

  sendInvoice() {
    const url = `${env.backendBaseURL}/api/admin/adminSendInvociceToMail/${this.transactionId}`
    this.api.callApi(url, 'POST', {}, {}).subscribe(res => {
      console.log('testing mail', res)
      alert(res['message'])

    })
  }

}
