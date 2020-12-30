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
      const uri = environment.api_url + 'getAllCoverJob';
      return this.http.post(uri,{});
    }
}
