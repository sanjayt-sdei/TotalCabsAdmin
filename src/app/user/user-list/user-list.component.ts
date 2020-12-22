import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  guests: any;

  constructor(private service: UserService,
    private http: HttpClient,
    private _toastr: ToastrService,
    private navRoute: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getuserList();
  }

  getuserList() {
    this.service.getAlluser().subscribe(res => {
      if (res) {
        console.log(res)
        this.guests = res.data
        console.log("guest", this.guests);

      } else {
        console.log('Error');

      }
    }
    );
  }

  Edit(id: number) {
    console.log("hhhhh", id);
    //  id=Id;
    this.navRoute.navigate(['/users/edit/'], { queryParams: { userId: id } });
    

  }

//   getUserById() {
//     let obj = { id: this.userId };
//     let id:any=this.userId
//     console.log("asdfgh", obj);
//     localStorage.setItem("DoctorId",id)

//     this._dataService.getdata(Global.BASE_API_PATH + "getUserById", obj).subscribe(res => {
//       if (!res.error) {
// var skills= res.data.skills.toString();
// var language= res.data.language.toString();

//         this.objRow = res.data;
      
//         console.log("dataaaaaaaaaaaa", res.data);
//         this.registrationForm.controls['id'].setValue(this.objRow.id);
//         this.registrationForm.controls['firstName'].setValue(this.objRow.firstName);
//         this.registrationForm.controls['lastName'].setValue(this.objRow.lastName);
//         this.registrationForm.controls['email'].setValue(this.objRow.email);
//         this.registrationForm.controls['country'].setValue(this.objRow.country);
//         this.registrationForm.controls['bio'].setValue(this.objRow.bio);
//         this.registrationForm.controls['skills'].setValue(skills);
//         this.registrationForm.controls['language'].setValue(language);
//       } else {
//         this._toastr.error(res.errors[0], "Create User");
//       }
//     });
//   }

  deleteuserList(id) {
    console.log("id", id)
    var data = { "_id": id }
    this.service.deleteUser(data).subscribe(res => {
      if (res) {
        console.log(res);
        this._toastr.success("User has been delete Successfully !!", "User");
        this.getuserList();
      } else {
        this._toastr.info("Error", "Doctor");

      }
    })
  }
}
