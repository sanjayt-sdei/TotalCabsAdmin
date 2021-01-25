import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit {
  bookingsList: any;
  page: number = 1;

  constructor(private api: AppService) { }


  ngOnInit(): void {
    this.getbookingsList();
  }

  getbookingsList() {
    this.api.callApi(`${environment.backendBaseURL}/api/admin/listBookings`, 'POST', {}, {}).subscribe(res => {
      this.bookingsList = res['data'].data;
      console.log('totalr count of llist', this.bookingsList.length, res['data'].data.length, res['data'])
    })
  }

}
