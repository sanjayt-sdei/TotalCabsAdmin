import { Injectable } from '@angular/core';
import { environment  } from "../../environments/environment";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient,
    private router: Router,) { }

    getAllCoverJob(): Observable<any> {
      const uri = environment.api_url + 'AdminGetAllCoverJob';
      return this.http.post(uri,{});
    }

    getAllOngoingJob(): Observable<any> {
      const uri = environment.api_url + 'adminGetAllOngoingJob';
      return this.http.post(uri,{});
    }
    getAllCompletedJob(): Observable<any> {
      const uri = environment.api_url + 'AdminGetAllCompletedJob';
      return this.http.post(uri,{});
    }

    getUserById(data): Observable<any> {
      console.log(data);
      const uri = environment.api_url + 'adminGetCustomerByid';
      return this.http.post(uri,data);
    }
    asignJobs(data): Observable<any> {
      console.log(data);
      const uri = environment.api_url + 'adminRiderequest';
      return this.http.post(uri,data);
    }
}
