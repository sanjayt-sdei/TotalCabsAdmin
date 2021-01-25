import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userTab = 'timeline';
  userId: any;
  objData: any;
  name: any;
  phonenumber: any;
  email: any;
  // lastName: any;
  dob: any;
  street: any;
  city: any;
  state: any;
  postcode: any;
  country: any;
  userType: any;
  carBrand: any;
  carType: any;
  carFuelType: any;
  licenseNo: any;
  carRegNo: any;
  carModel: any;
  licenseValid: any;
  carOwner: any;
  licenseFornt: any;
  licenseBcak: any;
  rcFront: any;
  rcBcak: any;
  imagefile: any;
  constructor(
    private service: UserService,
    private fb: FormBuilder,
    private navRoute: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private _toastr: ToastrService
  ) {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      console.log("userId", this.userId);

    });

  }

  ngOnInit(): void {
    this.getUserById();
  }




  getUserById() {
    let _id = { _id: this.userId };
    console.log("obj", _id);
    this.service.getUserById(_id).subscribe(res => {
      if (res && res.code == 200) {
        this.objData = res.data.data;
        this.name = res.data.data.name;
        // this.lastName = res.data.data.lastName;
        this.email = res.data.data.email;
        this.phonenumber = res.data.data.phonenumber;
        this.dob = res.data.data.dob;
        this.street = res.data.data.street;
        this.city = res.data.data.city;
        this.state = res.data.data.state;
        this.postcode = res.data.data.postcode;
        this.country = res.data.data.country;
        this.userType = res.data.data.userType;
        this.carBrand = res.data.data.carBrand;
        this.carType = res.data.data.carType;
        this.carFuelType = res.data.data.carFuelType;
        this.carModel = res.data.data.carModel;
        this.carRegNo = res.data.data.carRegNo;
        this.licenseNo = res.data.data.licenseNo;
        this.licenseValid = res.data.data.licenseValid;
        this.carOwner = res.data.data.carOwner;
        this.licenseFornt = res.data.data.documents.dlFront;
        this.licenseBcak = res.data.data.documents.dlBack;
        this.rcFront = res.data.data.documents.rcFront;
        this.rcBcak = res.data.data.documents.rcBack;
        this.imagefile = `${environment.imageurl}${res.data.data.imagefile}`;



        console.log("objData", this.objData);

      } else {
        this._toastr.info("Error", "Driver");
      }
    });
  }
}
