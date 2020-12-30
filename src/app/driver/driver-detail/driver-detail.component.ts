import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DriverServiceService } from '../driver-service.service';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.scss']
})
export class DriverDetailComponent implements OnInit {

  userTab = 'timeline';
  userId: any;
  objData: any;
  name: any;
  phonenumber: any;
  email: any;
  lastName: any;
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
    private route: ActivatedRoute,
    private _toastr: ToastrService,
    private service: DriverServiceService,


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
    this.service.getCurrentData(_id).subscribe(res => {
      if (res && res.code == 200) {
        this.objData = res.data.data;
        console.log("objData",this.objData);
        
        this.name = res.data.data.name;
        this.lastName = res.data.data.lastName;
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
        this.licenseFornt = res.data.data.licenseFornt;
        this.licenseBcak = res.data.data.licenseBcak;
        this.rcFront = res.data.data.rcFront;
        this.rcBcak = res.data.data.rcBcak;
        this.imagefile = res.data.data.imagefile;


        console.log("objData", this.objData);

      } else {
        this._toastr.info("Error", "Driver");
      }
    });
  }

}
