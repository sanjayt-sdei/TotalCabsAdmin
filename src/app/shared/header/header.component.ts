import { Component, OnInit, HostListener } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchField = false;
  toggleBodyClass = false;

  public get width() {
    return window.innerWidth;
  }

  constructor() {
   }

  ngOnInit(): void {
    this.setWindowClass()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setWindowClass();
  }

  toggleSidebar(){
    let body = document.getElementsByTagName('body')[0];
    if(!this.toggleBodyClass){
      body.classList.add('mini-sidebar');
    } else {
      body.classList.remove('mini-sidebar');
    }
    this.toggleBodyClass = !this.toggleBodyClass
  }

  setWindowClass() {
    var width = window.innerWidth;
    var topOffset = 70;
    let body = document.getElementsByTagName('body')[0];
    if (width < 1170) {
        body.classList.add("mini-sidebar");
        $('.navbar-brand span').hide();
        $(".sidebartoggler i").addClass("ti-menu");
    } else {
      body.classList.remove("mini-sidebar");
        $('.navbar-brand span').show();
    }

    var height = window.innerHeight - 1;
    height = height - topOffset;
    if (height < 1) height = 1;
    if (height > topOffset) {
        $(".page-wrapper").css("min-height", (height) + "px");
    }

};

}
