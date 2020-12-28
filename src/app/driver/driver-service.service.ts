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
  ) { }


  getAlldriver(): Observable<any> {
    const url = env.api_url + 'adminGetDriver';
    return this.http.post(url, {});
  }

  addDriver(data): Observable<any> {
    const url = env.api_url + 'adminAddDriver';
    return this.http.post(url, data);
  }


  deleteDriver(id): Observable<any> {
    console.log("ser", id);
    const url = env.api_url + 'adminDeleteDriver';
    return this.http.post(url, id);
  }

  getCurrentData(id): Observable<any> {
    const url = env.api_url + 'adminGetDriverByid';
    return this.http.post(url, id);
  }

  updatedriverdetails(data):Observable<any> {

    const url = env.api_url + 'adminUpdateDriver';
    return this
      .http
      .post(url,data);
  }














}
