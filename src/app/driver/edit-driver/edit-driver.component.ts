import { Component, OnInit } from '@angular/core';
import { DriverServiceService } from '../driver-service.service';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.scss']
})
export class EditDriverComponent implements OnInit {
  userForm: FormGroup;
  steps: number = 1;
  userId: number = 0;
  objData: any;
  guests: any;
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
    private fb: FormBuilder,
    private navRoute: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private _toastr: ToastrService) {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });
  }

  ngOnInit(): void {

    this.getDriverById();
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
      'email': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'phonenumber': ['', Validators.compose([Validators.required])],
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



  getDriverById() {
    let _id = { _id: this.userId };
    console.log("obj", _id);

    this.service.getCurrentData(_id).subscribe(res => {
      if (res && res.code == 200) {
        this.selectedValue = res.data.data.carOwner
        console.log("selectedValue",this.selectedValue);
        
        this.objData = res.data.data;
        console.log("objData", this.objData);
        // this.image =`${environment.imageurl}${res.data.data.imagefile}`;
        this.picLF = `${environment.imageurl}${res.data.data.licenseFornt}`;
        console.log("licenseFornt", this.picLF);

        this.picLB = `${environment.imageurl}${res.data.data.licenseBcak}`;
        console.log("licenseBcak", this.picLB);

        this.picRF = `${environment.imageurl}${res.data.data.rcFront}`;
        console.log("rcFront", this.picRF);

        this.picRB = `${environment.imageurl}${res.data.data.rcBcak}`;
        console.log("rcBcak", this.picRB);

        let dob = new Date(res.data.data.dob);
        let dob1 = dob.toISOString().slice(0, 10)
        console.log(dob.toISOString().slice(0, 10));
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
        this.userForm.controls['carBrand'].setValue(this.objData.carBrand);
        this.userForm.controls['carType'].setValue(this.objData.carType);
        this.userForm.controls['carFuelType'].setValue(this.objData.carFuelType);
        this.userForm.controls['carModel'].setValue(this.objData.carModel);
        this.userForm.controls['carRegNo'].setValue(this.objData.carRegNo);
        this.userForm.controls['licenseNo'].setValue(this.objData.licenseNo);
        this.userForm.controls['licenseValid'].setValue(this.objData.licenseValid);
        this.userForm.controls['carOwner'].setValue(this.objData.carOwner);
        this.userForm.controls['licenseFornt'].setValue(this.picLF);
        this.userForm.controls['licenseBcak'].setValue(this.picLB);
        this.userForm.controls['rcFront'].setValue(this.picRF);
        this.userForm.controls['rcBcak'].setValue(this.picRB);

      } else {
        this._toastr.info("Error", "Driver");
      }
    }
    );
  }


  submitForm() {
    this.markFormTouched(this.userForm);
    console.log(this.userForm.value);
    if (this.userForm.valid) {

      let fromData = this.prepareSave();
      console.log("fromData", fromData);
      // this.service.addDriver(fromData).subscribe(res => {
      this.service.updatedriverdetails(fromData).subscribe(res => {
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
    inputData.append('_id', this.userForm.get('_id').value);

    inputData.append('name', this.userForm.get('name').value);
    inputData.append('lastName', this.userForm.get('lastName').value);
    inputData.append('email', this.userForm.get('email').value);

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

  // selectChangeHandler(event: any) {
  //   this.selectedValue = event.target.value;
  //   console.log("selected value", this.selectedValue);

  //   if (this.selectedValue == "Yes") {
  //     this.form1 = true;
  //   }
  //   else if (this.selectedValue == "No") {
  //     this.form1 = false;

  //   } else {
  //     this._toastr.success("Error!!", "Driver");
  //   }
  // }

  // submitForm() {
  //   this.markFormTouched(this.userForm);
  //   console.log(this.userForm.value);

  //   if (this.userForm.valid) {
  //     this.service.updatedriverdetails(this.userForm.value).subscribe(res => {
  //       if (res) {
  //         console.log(this.userForm.value);
  //         this.navRoute.navigate(['/drivers']);
  //         this.reset();
  //         this._toastr.success("Driver has been Updated of Successfully !!", "Driver");
  //       } else {
  //         this._toastr.info("Error", "Doctor");
  //       }
  //     }
  //     );

  //   }
  // };
  // markFormTouched(group: FormGroup | FormArray) {
  //   Object.keys(group.controls).forEach((key: string) => {
  //     const control = group.controls[key];
  //     if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
  //     else { control.markAsTouched(); };
  //   });
  // };

  // reset() {
  //   this.userForm.reset();
  // }


  // }




}

