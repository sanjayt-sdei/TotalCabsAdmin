import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OnlyCharFieldValidator } from 'src/app/shared/validation/validations.validator';
import { DispachService } from '../dispach.service';
import { IDropdownSettings } from "ng-multiselect-dropdown";

@Component({
  selector: 'app-add-dispach',
  templateUrl: './add-dispach.component.html',
  styleUrls: ['./add-dispach.component.scss']
})
export class AddDispachComponent implements OnInit {

  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  cities: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};

  userForm: FormGroup;
  lat: number;
  lng: number;
  dropLocation: string;
  latitude: number;
  longitude: number;
  pickuplocation: string;
  latLocation: number;
  lngLocation: number;
  location: string;
  midlocationcount: Number;
  rbData: Boolean=false;

  midlocation(): FormArray {
    return this.userForm.get("midlocation") as FormArray
  }

  guests: any;
  @ViewChild('Pickuplocation', { static: false })
  public PickuplocationElementRef: ElementRef;
  @ViewChild('DropLocation', { static: false })
  public DropLocationElementRef: ElementRef;
  // @ViewChild('Location', { static: false })
  // public LocationElementRef: ElementRef;
  zoom: number = 3;


  constructor(
    private service: DispachService,
    private http: HttpClient,
    private fb: FormBuilder,
    private navRoute: Router,
    private route: ActivatedRoute,
    private _toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {


    this.userForm = this.fb.group({
      'dateOfJourney': [''],
      'timeOfJourney': ['', Validators.compose([Validators.required])],
      'cabNumber': ['', Validators.compose([Validators.required])],
      // 'name': ['', Validators.compose([Validators.required, OnlyCharFieldValidator.validOnlyCharField])],
      'pickUpLocation': ['', Validators.compose([Validators.required])],
      'dropUpLocation': ['', Validators.compose([Validators.required])],
      // 'midlocation':null,
      'midlocation': this.fb.array([]),
      'recursiveBooking':this.rbData,
      'dayOfJourney':[this.selectedItems]
    });

    this.lat = 43.8992496;
    this.lng = -71.6135105;
  }


  ngOnInit(): void {
    this.midlocation().push(this.newContainer());
    this.getLocation(this.midlocation().length);
    this.getdriverList();
    this.cities = [
      { id: 1, day: 'Monday' },
      { id: 2, day: 'Tuesday' },
      { id: 3, day: 'Wednesday' },
      { id: 4, day: 'Thursday' },
      { id: 5, day: 'Friday' },
      { id: 6, day: 'Saturday' }
  ];
  // this.selectedItems = [{ id: 4, day: 'Pune' }, { id: 6, day: 'Navsari' }];
  this.dropdownSettings = {
    "singleSelection": false,
    "defaultOpen": false,
    "idField": "id",
    "textField": "day",
    "selectAllText": "Select All",
    "unSelectAllText": "UnSelect All",
    "enableCheckAll": false,
    "itemsShowLimit": 3,
    "allowSearchFilter": true
  };
  // this.userForm = this.fb.group({
  //     dayOfJourney: [this.selectedItems]
  // });

    

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.PickuplocationElementRef.nativeElement, {
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log("place", place);
          this.latitude = place.geometry.location.lat();
          console.log("latitude", this.latitude);

          this.longitude = place.geometry.location.lng();
          console.log("longitude", this.longitude);
          this.pickuplocation = place.name + ',' + place.formatted_address;
          console.log("pickuplocation", this.pickuplocation);

          // for (var i = 0; i < place.address_components.length; i++) {
          //   var addressType = place.address_components[i].types[0];
          //   if (addressType == "country") {
          //     console.log(place.address_components[i].short_name);

          //   }
          // }
        });
      });
    });
  }
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
}
toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
}

// handleLimitSelection() {
//     if (this.limitSelection) {
//         this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
//         console.log("dropdownSettings",this.dropdownSettings);
        
//     } else {
//         this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
//     }
// }
  ngAfterViewChecked() {
    // viewChild is updated after the view has been checked
    if (this.midlocation().length !== this.midlocationcount) {
      this.midlocationcount = this.midlocation().length;
      this.getLocation(this.midlocation().length);
    }
  }

  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.DropLocationElementRef.nativeElement, {
        // types: ['(cities)'],
        // componentRestrictions: {country: ['IN','NP']}
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.lat = place.geometry.location.lat();
          console.log("latitude", this.lat);
          this.lng = place.geometry.location.lng();
          console.log("long", this.lng);
          this.dropLocation = place.name + ',' + place.formatted_address;
          console.log("dropLocation", this.dropLocation);

        });
      });
    });
  }
  long(arg0: string, long: any) {
    throw new Error('Method not implemented.');
  }

  getLocation(count?) {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(<HTMLInputElement>document.querySelector(`#location_${count - 1}`), {
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // setting up form value
          this.midlocation().controls[count - 1].get('latitude').setValue(place.geometry.location.lat())
          this.midlocation().controls[count - 1].get('longitude').setValue(place.geometry.location.lng())
          this.midlocation().controls[count - 1].get('location').setValue(place.name + ',' + place.formatted_address)

          this.latLocation = place.geometry.location.lat();
          console.log("latitude", this.latLocation);
          this.lngLocation = place.geometry.location.lng();
          console.log("long", this.lngLocation);
          this.location = place.name + ',' + place.formatted_address;
          console.log("location", this.location);
        });
      });
    });
  }

  newContainer(): FormGroup {
    return this.fb.group({
      location: '',
      latitude: '',
      longitude: '',
    })
  }

  addDispatchJob() {
    this.midlocation().push(this.newContainer());
  }
  removeContainer(i: number) {
    this.midlocation().removeAt(i);
  }
  getdriverList() {
    this.service.getAlldriver().subscribe(res => {
      if (res && res.code == 200) {
        console.log(res)
        this.guests = res.data
        console.log("guest", this.guests);
      } else {
        console.log('Error');

      }
    }
    );
  }
  FieldsChange(values:any){
    this.rbData=values.currentTarget.checked;
    console.log("rbData",this.rbData);
    }
  submitForm() {
    this.markFormTouched(this.userForm);
console.log("Dispatchdata",this.userForm.value);

    if (this.userForm.valid) {
      let finalData = {
      dateOfJourney:this.userForm.value.dateOfJourney,
      timeOfJourney:this.userForm.value.timeOfJourney,
      // driverdetails:this.userForm.value.name,
      cabNumber:this.userForm.value.cabNumber,
      pickupLocation: {
        latitude: this.latitude,
        longitude: this.longitude,
        address: this.pickuplocation
      },
      dropLocation: {
        latitude: this.lat,
        longitude:this.lng,
        address: this.dropLocation
      },
      midlocation:this.userForm.value.midlocation

    }
    console.log("finalData", finalData);
   
      this.service.addDespatchJob(finalData).subscribe(res => {
        if (res && res.code == 200) {
          console.log(this.userForm.value);
          this.navRoute.navigate(['/dispach']);
          this.reset();
          this._toastr.success(res.message, "Driver");
        } else if (res && res.code == 402) {
          this._toastr.info(res.message, "Despatch Jobs ");
        } else {
          this._toastr.info("Error", "Despatch Jobs");
        }
      });
    }
    else{
      this._toastr.info("Error", "Despatch Jobs");
    }
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
