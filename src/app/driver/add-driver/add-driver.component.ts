import { Component, OnInit } from '@angular/core';
import {DriverServiceService  } from '../driver-service.service';
import {environment  } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http'; 


@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {
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
  constructor(private service: DriverServiceService,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  AddDriver(){
    let data = {
      "firstName1" : this.firstName1,
      "lastName1" : this.lastName1,
      "phoneNumber1" : this.phoneNumber1,
      "email" : this.email,
      "upload2" : this.upload2,
      "licvalid" : this.licvalid,
      "licn":this.licn,
      "upload" : this.upload,
      "carfuel" : this.carfuel,
      "carrn":this.carrn,
      "cartype":this.cartype,
      "carmodel": this.carmodel,
      "carbrand":this.carbrand,
      "city":this.city,
      "carowner":this.carowner,
      "Lvt":this.country,
      "postcode":this.postcode,
      "state":this.state,
      "street":this.street,
      "country":this.country,
      "date1":this.date1,
      "location1":this.location1,
    };


    console.log("data",data)

    this.service.addDriver(data).subscribe(
      data => {
          console.log(data)
          this.guests = data;
          
      },
      error => {
         console.log('error')
      });
 
  }

}
