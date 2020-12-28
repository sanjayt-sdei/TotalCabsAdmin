import { Injectable } from '@angular/core';
import { environment as env } from "../../environments/environment";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private router: Router,) { }

  getAlluser(): Observable<any> {
    const uri = env.api_url + 'adminGetCustomer';
    return this.http.post(uri,{});
  }

  deleteUser(id): Observable<any> {
    console.log("ser", id);
    const uri = env.api_url + 'adminDeleteUser';
    return this.http.post(uri, id);
  }

  addUser(data): Observable<any> {
    const uri = env.api_url + 'adminAddCustomer';
    return this.http.post(uri, data);
  }
  editUser(data): Observable<any> {
    const uri = env.api_url + 'adminUpdateCustomer';
    return this.http.post(uri, data);
  }

  getUserById(data): Observable<any> {
    console.log(data);
    const uri = env.api_url + 'adminGetCustomerByid';
    return this.http.post(uri,data);
  }
}
