import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  steps: number = 1;
  userForm: FormGroup;
  constructor(
    private service: UserService,
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
      'userType':['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {

  }


  submitForm() {
    this.markFormTouched(this.userForm);
    if (this.userForm.valid) {
      this.service.addUser(this.userForm.value).subscribe(res => {
        if (res) {
          console.log(this.userForm.value);
          this.navRoute.navigate(['/users']);
          this.reset();
          this._toastr.success(res.message, "User");
        } else {
          this._toastr.info(res.message, "Doctor");
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
