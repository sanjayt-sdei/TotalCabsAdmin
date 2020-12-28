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
  selectedValue: any;
  form1: boolean;
  picLB: string | ArrayBuffer;
  picLF: string | ArrayBuffer;
  imageInpt: any;
  imageChangedEvent: string;
  imageSelected: boolean;
  croppedImage: boolean;
  picRF: string | ArrayBuffer;
  picRB: string | ArrayBuffer;
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
      'carBrand': [''],
      'carType': [''],
      'carModel': [''],
      'carRegNo': [''],
      'carFuelType': [''],
      'licenseNo': ['', Validators.compose([Validators.required])],
      'licenseValid': ['', Validators.compose([Validators.required])],
      'carOwner': ['', Validators.compose([Validators.required])],
      'userType': 'Driver',
      'licenseFornt': null,
      'licenseBcak': null,
      'rcBcak': null,
      'rcFront': null
    });
  }
  // 'licenseFornt': this.picLF,
  // 'licenseBcak':this.picLB
  // 'carBrand': ['', Validators.compose([Validators.required])],
  // 'carType': ['', Validators.compose([Validators.required])],
  // 'carModel': ['', Validators.compose([Validators.required])],
  // 'carRegNo': ['', Validators.compose([Validators.required])],
  // 'carFuelType': ['', Validators.compose([Validators.required])],

  ngOnInit(): void {

  }

  submitForm() {
    this.markFormTouched(this.userForm);
    console.log(this.userForm.value);
    if (this.userForm.valid) {

      let fromData = this.prepareSave();
      console.log("fromData", fromData);
      this.service.addDriver(fromData).subscribe(res => {
        if (res && res.code == 200) {
          console.log(this.userForm.value);
          this.navRoute.navigate(['/drivers']);
          this.reset();
          this._toastr.success(res.message, "Driver");
        } else if (res.code == 402) {
          this._toastr.info(res.message, "Dirver ");
        } else {
          this._toastr.info("Error", "Dirver ");
        }
      }
      );

    }
  };
  private prepareSave(): any {
    let inputData = new FormData();
    inputData.append('name', this.userForm.get('name').value);
    inputData.append('lastName', this.userForm.get('lastName').value);
    inputData.append('email', this.userForm.get('email').value);
    inputData.append('password', this.userForm.get('password').value)
    inputData.append('phonenumber', this.userForm.get('phonenumber').value);
    inputData.append('dob', this.userForm.get('dob').value)
    inputData.append('street', this.userForm.get('street').value)
    inputData.append('city', this.userForm.get('city').value)
    inputData.append('state', this.userForm.get('state').value)
    inputData.append('postcode', this.userForm.get('postcode').value)
    inputData.append('country', this.userForm.get('country').value)
    inputData.append('carBrand', this.userForm.get('carBrand').value)
    inputData.append('carType', this.userForm.get('carType').value)
    inputData.append('carModel', this.userForm.get('carModel').value)
    inputData.append('carRegNo', this.userForm.get('carRegNo').value)
    inputData.append('carFuelType', this.userForm.get('carFuelType').value)
    inputData.append('licenseNo', this.userForm.get('licenseNo').value)
    inputData.append('licenseValid', this.userForm.get('licenseValid').value)
    inputData.append('carOwner', this.userForm.get('carOwner').value)
    inputData.append('userType', this.userForm.get('userType').value)
    inputData.append('licenseFornt', this.userForm.get('licenseFornt').value)
    inputData.append('licenseBcak', this.userForm.get('licenseBcak').value)
    inputData.append('rcBcak', this.userForm.get('rcBcak').value)
    inputData.append('rcFront', this.userForm.get('rcFront').value)
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
  selectChangeHandler(event: any) {
    this.selectedValue = event.target.value;
    console.log("selected value", this.selectedValue);

    if (this.selectedValue == "Yes") {
      this.form1 = true;
    }
    else if (this.selectedValue == "No") {
      this.form1 = false;

    } else {
      this._toastr.success("Error!!", "Driver");
    }
  }
  onSelectLF(event) {
    console.log(event, 'error')
    if (event && event.target && event.target.files[0].size > 5072000) {
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
        this.picLF = (<FileReader>event.target).result;
        console.log("picLF", this.picLF);
      }
      reader.onloadend = (event: ProgressEvent) => {
      }
      reader.readAsDataURL(event.target.files[0]);
      this.userForm.get('licenseFornt').setValue(file);
    }
  }
  onSelectLB(event) {
    console.log(event, 'error')
    if (event && event.target && event.target.files[0].size > 5072000) {
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
        this.picLB = (<FileReader>event.target).result;
        console.log("picLB", this.picLB);
      }
      reader.onloadend = (event: ProgressEvent) => {
      }
      reader.readAsDataURL(event.target.files[0]);

      this.userForm.get('licenseBcak').setValue(file);
    }
  }
  onSelectRF(event) {
    console.log(event, 'error')
    if (event && event.target && event.target.files[0].size > 5072000) {
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
        this.picRF = (<FileReader>event.target).result;
        console.log("picRF", this.picRF);
      }
      reader.onloadend = (event: ProgressEvent) => {
      }
      reader.readAsDataURL(event.target.files[0]);
      this.userForm.get('rcFront').setValue(file);
    }
  }
  onSelectRB(event) {
    console.log(event, 'error')
    if (event && event.target && event.target.files[0].size > 5072000) {
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
        this.picRB = (<FileReader>event.target).result;
        console.log("picRB", this.picRB);
      }
      reader.onloadend = (event: ProgressEvent) => {
      }
      reader.readAsDataURL(event.target.files[0]);
      this.userForm.get('rcBcak').setValue(file);
    }
  }
  base64ToFile(data, filename) {
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }


}

