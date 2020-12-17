import { Component, OnInit } from '@angular/core';
import {DriverServiceService  } from '../driver-service.service';
import {environment  } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.scss']
})
export class EditDriverComponent implements OnInit {
  name:any='';
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
  licencenumber:any="";
  licvalid:any="";
  upload2:any="";
  steps: number = 1;
  guests: any;
  bid: any;
  constructor(private service: DriverServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
     this.bid = this.route.snapshot.params['id'];
     let postdata =  {
      "_id":this.bid
  };
      this.editdriver(postdata);
   
  }

  AddDriver(){
    let data = {
      "name" : this.name,
      "lastName1" : this.lastName1,
      "phoneNumber1" : this.phoneNumber1,
      "email" : this.email,
      "upload2" : this.upload2,
      "licvalid" : this.licvalid,
      "licencenumber":this.licencenumber,
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
  editdriver(id) {
    this.service.getCurrentData(id).subscribe(res => {
     console.log(res)
  
      this.guests = res['data'][0];
      this.email = this.guests.email;
   
    })
  
    }
  


    onupdate(){
      console.log(this.carmodel);
      console.log(this.cartype);
      console.log(this.carrn);
      console.log(this.carfuel);
      console.log(this.upload);
      console.log(this.licencenumber);
      console.log(this.licvalid);
      console.log(this.upload2);
      console.log(this.email);
      console.log(this.phoneNumber1);
      console.log(this.lastName1);
      console.log(this.date1);
      console.log(this.street);
      console.log(this.state);
      console.log(this.postcode);
      console.log(this.country);
      console.log(this.carowner);
      console.log(this.city);
      console.log(this.carbrand);
      console.log(this.location1);

      let data = {
        "name" : this.name,
        "lastName1" : this.lastName1,
        "phoneNumber1" : this.phoneNumber1,
        "email" : this.email,
        "upload2" : this.upload2,
        "licvalid" : this.licvalid,
        "licencenumber":this.licencenumber,
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

      this.service.updatedriverdetails(this.bid, data ).subscribe(
        res => {
          console.log(res)
          // this.disableSubmit = false;
           
        }, () => {
          //this.disableSubmit = false;
        });
  
      
    }
  }

