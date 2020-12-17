import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
firstName1:any='';
  lastName1:any='';
  email:any="";
  phoneNumber1:any="";
  location1:any="";
  date1:any="";
  street:any="";
  city:any="";
  state:any="";
  postcode:any="";
  country:any="";
  carowner:any="";
  carbrand:any="";
  carmodel:any="";
  cartype:any="";
  carrn:any="";
  carfuel:any="";
  upload:any="";
  licn:any="";
  licvalid:any="";
  upload2:any="";
  steps: number = 1;
  guests: Object;
  constructor() { }

  ngOnInit(): void {
  }

}
