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
  imageUrl: any;
  image: any;
  croppedImage: any;
  imageChangedEvent: string;
  imageSelected: boolean;
  imageInpt: any;
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
      'userType': ['', Validators.compose([Validators.required])],
      'filename': null
    });
  }

  ngOnInit(): void {

  }
  submitForm() {
    this.markFormTouched(this.userForm);


    let formModel = this.prepareSave();
    console.log("formModel",formModel);
    
    if (this.userForm.valid) {
      this.service.addUser(formModel).subscribe(res => {
        if (res && res.code == 200) {
          console.log(this.userForm.value);
          this.navRoute.navigate(['/users']);
          this.reset();
          this._toastr.success(res.message, "User");
        } else {
          this._toastr.info(res.message, "User");
        }
      }
      );

    }
  };

  private prepareSave(): any {
    let inputData = new FormData();
    // inputData.append('_id', this.id);
    inputData.append('name', this.userForm.get('name').value);
    inputData.append('email', this.userForm.get('email').value);
    inputData.append('phonenumber', this.userForm.get('phonenumber').value);
    inputData.append('password', this.userForm.get('password').value);
    inputData.append('dob', this.userForm.get('dob').value);
    inputData.append('street', this.userForm.get('street').value);
    inputData.append('city', this.userForm.get('city').value);
    inputData.append('state', this.userForm.get('state').value);
    inputData.append('country', this.userForm.get('country').value);
    inputData.append('postcode', this.userForm.get('postcode').value);
    inputData.append('userType', this.userForm.get('userType').value);
    inputData.append('filename', this.userForm.get('filename').value);
    return inputData;
  }

  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };


  onSelectFile(event) {

    console.log(event, 'error')
    if (event && event.target && event.target.files[0].size > 5072000) {
      // this.toastr.error("File Size should be less then 5 MB");
      this.imageInpt.nativeElement.value = "";
    }
    else {
      let file = event.target.files[0];
      let re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
      if (!re.exec(file.name)) {
        this._toastr.error("File type not supported!");
        return;
      }
      let reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.imageUrl = (<FileReader>event.target).result;
        this.image = this.imageUrl;
      }

      reader.onloadend = (event: ProgressEvent) => {
      }
      reader.readAsDataURL(event.target.files[0]);

      this.userForm.get('filename').setValue(file);
    }
  }
  base64ToFile(data, filename) {
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
  
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
  }


  reset() {
    this.userForm.reset();
  }



}

