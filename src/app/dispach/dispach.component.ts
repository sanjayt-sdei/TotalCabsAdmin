import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispach',
  templateUrl: './dispach.component.html',
  styleUrls: ['./dispach.component.scss']
})
export class DispachComponent implements OnInit {

  userTab='Requested';
  constructor() { }

  ngOnInit(): void {
  }

  selectData(){
    this.userTab='Add';
  }
  selectData1(){
    this.userTab='Ongoing';
  }
  selectData2(){
    this.userTab='Completed';
  }
}
