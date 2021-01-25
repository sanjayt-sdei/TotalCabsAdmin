import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DispachService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }
  getAlldriver(): Observable<any> {
    const url = environment.api_url + 'adminGetDriver';
    return this.http.post(url, {});
  }
  addDespatchJob(data):Observable<any> {
    console.log("data",data);
    
    const url = environment.api_url + 'adminAddDespatchJobs';
    return this.http.post(url, data);
  }

}
