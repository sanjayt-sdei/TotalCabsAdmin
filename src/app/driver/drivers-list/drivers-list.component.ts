import { Component, OnInit } from '@angular/core';
import {DriverServiceService  } from '../driver-service.service';
import {environment  } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss']
})
export class DriversListComponent implements OnInit {
  guests: any;
  
 
 

  constructor( private service: DriverServiceService,
    private http: HttpClient)
     { }


     
  ngOnInit(): void {
console.log('hhhhhhh')
   this.getdriverList(); 
  }

  getdriverList() {
    this.service.getAlldriver().subscribe(res => {
     console.log(res)
     this.guests = res['data'].data
   });
  }

  deletedriverList(id){
    console.log("id",id)
    var data={"_id":id}
    this.service.deleteDrive(data).subscribe(res =>{
      console.log(res)
      
    })
  }
   

}
