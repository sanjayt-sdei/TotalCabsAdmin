import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'totalcab-admin';
  preloader = true;
  miniHeight: number = 2;

  constructor() {

  }

  ngOnInit(): void {
    this.setMiniHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setMiniHeight();
  }

  preloaderToggle(){
    setTimeout(function(){
      return false;
    }, 7000)
  }

  setMiniHeight(){
    this.miniHeight = window.innerHeight - 56;
    console.log(this.miniHeight);
  }
}
