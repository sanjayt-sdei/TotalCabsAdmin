import { Injectable } from '@angular/core';
import { environment as env } from "../../environments/environment";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, 
    private router: Router, ) { }

    getAlluser(data="") {
      const uri = env.api_url2 + 'getUser';
      return this
           .http
           .get(uri);
     }

     deleteUser(id){
      console.log("ser",id);
      const uri = env.api_url2 + 'deleteUser';
          return this
                .http
               .post(uri, id);
    }

    addUser(data) {
      const uri = env.api_url2 + 'customerSignup';
      return this
            .http
           .post(uri, data);
    }

    
}
