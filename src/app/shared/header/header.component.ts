import { Component, OnInit, HostListener } from '@angular/core';
// import $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchField = false;
  toggleBodyClass = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
