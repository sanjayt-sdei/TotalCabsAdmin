import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.scss']
})
export class DriverDetailComponent implements OnInit {

  userTab = 'timeline';

  constructor() { }

  ngOnInit(): void {
  }

}
