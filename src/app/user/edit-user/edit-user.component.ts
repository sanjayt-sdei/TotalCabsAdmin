import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
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
  imageInpt: any;
  imageUrl: any;
  image: any;
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
      'filename':null     
    });
  }

  onSelectFile(event) {
  
      console.log(event,'error')
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
        reader.onload = (event: ProgressEvent) =>{
          this.image = (<FileReader>event.target).result;
          // this.image = this.imageUrl;
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



  getUserById() {
    let _id = { _id: this.userId };
    console.log("obj", _id);
    this.service.getUserById(_id).subscribe(res => {
      if (res) {
        this.image=`${environment.imageurl}${res.data.data.imagefile}`;
        console.log("rcBcak", this.image);

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
        this.userForm.controls['userType'].setValue(this.objData.userType);
        this.userForm.controls['filename'].setValue(this.image);
      } else {
        this._toastr.info("Error", "User");
      }
    }
    );
  }

  submitForm() {
    this.markFormTouched(this.userForm);
    console.log(this.userForm.value);
    let formModel = this.prepareSave();
    if (this.userForm.valid) {
      this.service.editUser(formModel).subscribe(res => {
        if (res && res.code == 200) {
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

  private prepareSave(): any {
    let inputData = new FormData();
    inputData.append('_id', this.userForm.get('_id').value);
    inputData.append('name', this.userForm.get('name').value);
    inputData.append('lastName', this.userForm.get('lastName').value);
    inputData.append('email', this.userForm.get('email').value);
    inputData.append('phonenumber', this.userForm.get('phonenumber').value);
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

  reset() {
    this.userForm.reset();
  }
}


