import { Component, OnInit } from '@angular/core';
import {UserService  } from '../user.service';
import {environment  } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  guests: any;

  constructor(private service: UserService,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.getuserList();
  }

  getuserList() {
    this.service.getAlluser().subscribe(res => {
     console.log(res)
     this.guests = res['data'].data
   });
  }


  deleteuserList(id){
    console.log("id",id)
    var data={"_id":id}
    this.service.deleteUser(data).subscribe(res =>{
      console.log(res)
      
      
    })
  }
}
