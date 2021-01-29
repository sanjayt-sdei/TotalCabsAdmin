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

    this.initMap();
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
 initMap(): void {
  const bounds = new google.maps.LatLngBounds();
  const markersArray: google.maps.Marker[] = [];

  const origin1 = { lat: 55.93, lng: -3.118 };
  const origin2 = "Greenwich, England";
  const destinationA = "Stockholm, Sweden";
  const destinationB = { lat: 50.087, lng: 14.421 };

  const destinationIcon =
    "https://chart.googleapis.com/chart?" +
    "chst=d_map_pin_letter&chld=D|FF0000|000000";
  const originIcon =
    "https://chart.googleapis.com/chart?" +
    "chst=d_map_pin_letter&chld=O|FFFF00|000000";
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: 55.53, lng: 9.4 },
      zoom: 10,
    }
  );
  const geocoder = new google.maps.Geocoder();

  const service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin1, origin2],
      destinations: [destinationA, destinationB],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    },
    (response, status) => {
      if (status !== "OK") {
        alert("Error was: " + status);
      } else {
        const originList = response.originAddresses;
        const destinationList = response.destinationAddresses;
        const outputDiv = document.getElementById("output") as HTMLDivElement;
        outputDiv.innerHTML = "";
        this.deleteMarkers(markersArray);

        const showGeocodedAddressOnMap = function (asDestination: boolean) {
          const icon = asDestination ? destinationIcon : originIcon;

          return function (
            results: google.maps.GeocoderResult[],
            status: google.maps.GeocoderStatus
          ) {
            if (status === "OK") {
              map.fitBounds(bounds.extend(results[0].geometry.location));
              markersArray.push(
                new google.maps.Marker({
                  map,
                  position: results[0].geometry.location,
                  icon: icon,
                })
              );
            } else {
              alert("Geocode was not successful due to: " + status);
            }
          };
        };

        for (let i = 0; i < originList.length; i++) {
          const results = response.rows[i].elements;
          geocoder.geocode(
            { address: originList[i] },
            showGeocodedAddressOnMap(false)
          );

          for (let j = 0; j < results.length; j++) {
            geocoder.geocode(
              { address: destinationList[j] },
              showGeocodedAddressOnMap(true)
            );
            outputDiv.innerHTML +=
              originList[i] +
              " to " +
              destinationList[j] +
              ": " +
              results[j].distance.text +
              " in " +
              results[j].duration.text +
              "<br>";
          }
        }
      }
    }
  );
}

deleteMarkers(markersArray: google.maps.Marker[]) {
  for (let i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
  console.log("markersArray",markersArray);
  
}


//  calcCrow(lat1, lon1, lat2, lon2) 
//     {
//       var R = 6371; // km
//       var dLat = this.toRad(lat2-lat1);
//       var dLon = this.toRad(lon2-lon1);
//       var lat1 = this.toRad(lat1);
//       var lat2 = this.toRad(lat2);

//       var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//         Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
//       var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//       var d = R * c;
//       return d;
//     }

//     // Converts numeric degrees to radians
//      toRad(Value) 
//     {
//         return Value * Math.PI / 180;
//     }


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
