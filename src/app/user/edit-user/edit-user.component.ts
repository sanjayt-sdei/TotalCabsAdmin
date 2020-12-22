import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  steps: number = 1;
  userId: number = 0;
  objData: any;
  constructor(
    private service: UserService,
    private fb: FormBuilder,
    private navRoute: Router,
    private route: ActivatedRoute,
    private _toastr: ToastrService) {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });

  }

  ngOnInit(): void {
    this.getUserById();
    this.createdDoctorRegForm();
  }
  // ngAfterViewInit() {
  //   this.createdDoctorRegForm();
  // }
  createdDoctorRegForm() {

    this.userForm = this.fb.group({
      '_id': [0],
      'name': ['', Validators.compose([Validators.required])],
      'lastName': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'phonenumber': ['', Validators.compose([Validators.required])],
      'dob': ['', Validators.compose([Validators.required])],
      'street': ['', Validators.compose([Validators.required])],
      'city': ['', Validators.compose([Validators.required])],
      'state': ['', Validators.compose([Validators.required])],
      'postcode': ['', Validators.compose([Validators.required])],
      'country': ['', Validators.compose([Validators.required])],
      'userType': ['', Validators.compose([Validators.required])],      
    });
  }
  // get f() {
  //   return this.userForm.controls;
  // }
  getUserById() {
    let _id = { _id: this.userId };
    console.log("obj", _id);
    this.service.getUserById(_id).subscribe(res => {
      if (res) {
        this.objData = res.data.data;
        let dob= new Date(res.data.data.dob);
        let dob1=dob.toISOString().slice(0,10)
        console.log(dob.toISOString().slice(0,10));
        this.userForm.controls['_id'].setValue(this.objData._id);
        this.userForm.controls['name'].setValue(this.objData.name);
        this.userForm.controls['lastName'].setValue(this.objData.lastName);
        this.userForm.controls['email'].setValue(this.objData.email);
        this.userForm.controls['phonenumber'].setValue(this.objData.phonenumber);
        this.userForm.controls['dob'].setValue(dob1);
        this.userForm.controls['street'].setValue(this.objData.street);
        this.userForm.controls['city'].setValue(this.objData.city);
        this.userForm.controls['state'].setValue(this.objData.state);
        this.userForm.controls['postcode'].setValue(this.objData.postcode);
        this.userForm.controls['country'].setValue(this.objData.country);
        this.userForm.controls['userType'].setValue(this.objData.userType);
      } else {
        this._toastr.info("Error", "User");
      }
    }
    );
  }

  submitForm() {
    this.markFormTouched(this.userForm);
    console.log(this.userForm.value);

    if (this.userForm.valid) {
      this.service.editUser(this.userForm.value).subscribe(res => {
        if (res) {
          console.log(this.userForm.value);
          this.navRoute.navigate(['/users']);
          this.reset();
          this._toastr.success("User has been Updated of Successfully !!", "User");
        } else {
          this._toastr.info("Error", "Doctor");
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
