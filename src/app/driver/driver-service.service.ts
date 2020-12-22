import { Injectable } from '@angular/core';
import { environment as env } from "../../environments/environment";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverServiceService {
  

  constructor(
    private http: HttpClient, 
    private router: Router, 
  ) {}


  getAlldriver(data="") {
      const uri = env.api_url + 'getAlldriver';
      return this
           .http
           .get(uri);
     }

      addDriver(data):Observable<any>{
      const uri = env.api_url2 + 'addCustomer';
      return this
            .http
           .post(uri, data);
    }
   

deleteDrive(id){
  console.log("ser",id);
  const uri = env.api_url + 'deleteDriver';
      return this
            .http
           .post(uri, id);
}

getCurrentData(id){
  const uri = env.api_url + 'findDriverById';
  return this
        .http
       .post(uri, id);
}

updatedriverdetails(id,data){

  const uri = env.api_url + 'updatedriverData';
  return this
        .http
       .post(uri, id, data);
}





    

 

 
 
  


}
