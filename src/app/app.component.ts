import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'totalcab-admin';
  preloader = true;
  miniHeight: number = 2;
  currentUrl: any;
  constructor(
    private router: Router,
  ) {
    router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        //  console.log("current url",event.url); // event.url has current url

        this.currentUrl = event.url;
        // your code will goes here
        console.log("currenturl",this.currentUrl);
        
      }
    });

  }

  ngOnInit(): void {
    this.setMiniHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setMiniHeight();
  }

  preloaderToggle() {
    setTimeout(function () {
      return false;
    }, 7000)
  }

  setMiniHeight() {
    this.miniHeight = window.innerHeight - 56;
    console.log(this.miniHeight);
  }
}
