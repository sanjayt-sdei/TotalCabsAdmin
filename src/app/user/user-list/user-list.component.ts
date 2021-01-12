import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  guests: any;
  data: any;
  showModal:boolean;
  constructor(private service: UserService,
    private http: HttpClient,
    private _toastr: ToastrService,
    private navRoute: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getuserList();
  }


  
  getuserList() {
    this.spinner.show();
    this.service.getAlluser().subscribe(res => {
        if (res && res.code == 200) {
          this.spinner.hide();
          setTimeout(() => {
          console.log(res)
          this.guests = res.data
          console.log("guest", this.guests);
       
        }, 5000)
      } else {
        console.log('Error');

      }
    }
    );
  }
  close(){
    this.showModal=false; 
  }

  getId(rowData: any) {
    this.data = rowData;
    console.log("data",this.data);
    this.showModal=true;
    
    // this.getBankDetailsByUserId();
  }

  Edit(id: number) {
    // console.log("hhhhh", id);
    //  id=Id;
    this.navRoute.navigate(['/users/edit/'], { queryParams: { userId: id } });
  }
  veiw(id:number){
    console.log("hhhhh", id);
    this.navRoute.navigate(['/users/details/'], { queryParams: { userId: id } });
  }
  deleteuserList() {
    // this.showModal=true;
    
    console.log("id", this.data)
    var data = { "_id": this.data }
    this.service.deleteUser(data).subscribe(res => {
        if (res && res.status == 200) {
        console.log(res);
        this._toastr.success("User has been delete Successfully !!", "User");
        this.close();
        this.getuserList();
      } else {
        this._toastr.info("Error", "Doctor");

      }
    })
  }
}
