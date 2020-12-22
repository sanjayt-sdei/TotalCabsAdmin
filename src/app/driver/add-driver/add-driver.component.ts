import { Component, OnInit } from '@angular/core';
import { DriverServiceService } from '../driver-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {
  steps: number = 1;
  userForm: FormGroup;
  constructor(
    private service: DriverServiceService,
    private http: HttpClient,
    fb: FormBuilder,
    private navRoute: Router,
    private route: ActivatedRoute,
    private _toastr: ToastrService
  ) {
    this.userForm = fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'lastName': ['', Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'phonenumber': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])],
      'dob': ['', Validators.compose([Validators.required])],
      'street': ['', Validators.compose([Validators.required])],
      'city': ['', Validators.compose([Validators.required])],
      'state': ['', Validators.compose([Validators.required])],
      'postcode': ['', Validators.compose([Validators.required])],
      'country': ['', Validators.compose([Validators.required])],
      'carBrand': ['', Validators.compose([Validators.required])],
      'carType': ['', Validators.compose([Validators.required])],
      'carModel': ['', Validators.compose([Validators.required])],
      'carRegNo': ['', Validators.compose([Validators.required])],
      'carFuelType': ['', Validators.compose([Validators.required])],
      'licenseNo': ['', Validators.compose([Validators.required])],
      'licenseValid': ['', Validators.compose([Validators.required])],
      'userType':'Driver',
    });
  }

  ngOnInit(): void {

  }


  submitForm() {
    this.markFormTouched(this.userForm);
    console.log(this.userForm.value);

    if (this.userForm.valid) {
      this.service.addDriver(this.userForm.value).subscribe(res => {
        if (res) {
          console.log(this.userForm.value);
          this.navRoute.navigate(['/drivers']);
          this.reset();
          this._toastr.success(res.message, "Driver");
        } else {
          this._toastr.info(res.message, "Dirver ");
        }
      }
      );

    }
  };
  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };

  reset() {
    this.userForm.reset();
  }



}
