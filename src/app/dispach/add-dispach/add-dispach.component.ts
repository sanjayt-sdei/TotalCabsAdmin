import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OnlyCharFieldValidator } from 'src/app/shared/validation/validations.validator';
import { DispachService } from '../dispach.service'
import * as $ from 'jquery'

@Component({
  selector: 'app-add-dispach',
  templateUrl: './add-dispach.component.html',
  styleUrls: ['./add-dispach.component.scss']
})
export class AddDispachComponent implements OnInit {
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

  guests: any;
  zoom: number = 3;


  constructor(
    private service: DispachService,
    private http: HttpClient,
    private fb: FormBuilder,
    private navRoute: Router,
    private route: ActivatedRoute,
    private _toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.lat = 43.8992496;
    this.lng = -71.6135105;
  }


  ngOnInit(): void {
    this.getdriverList();

    this.mapsAPILoader.load().then(() => {
      var acInputs = document.getElementsByClassName("autocomplete");
      console.log('-------------------', acInputs);
      for (var i = 0; i < acInputs.length; i++) {
        var address = <HTMLInputElement>document.getElementById('address'+i);
        var autocomplete = new google.maps.places.Autocomplete(address);

        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          var latitude = place.geometry.location.lat();
          var longitude = place.geometry.location.lng();
          console.log('Place------', place);
          console.log('latitude---', latitude);
          console.log('longitude--', longitude);
        });

      }
    });


    // Add more intermediate location
    $("#add").click(function() {
      var lastField = $("#intermideatelocation div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      var fieldWrapper = $("<div class=\"fieldwrapper\" id=\"field" + intId + "\"/>");
      fieldWrapper.data("idx", intId);
      var fName = $("<input type=\"text\" id=\"address"+intId+"\" class=\"autocomplete\" />");
      var removeButton = $("<input type=\"button\" class=\"remove\" value=\"-\" />");
      removeButton.click(function() {
          $(this).parent().remove();
      });
      fieldWrapper.append(fName);
      fieldWrapper.append(removeButton);
      $("#intermideatelocation").append(fieldWrapper);


      console.log('------------------');
      var acInputs = document.getElementsByClassName("autocomplete");
      console.log('-------------------', acInputs);
      for (var i = 0; i < acInputs.length; i++) {
        var address = <HTMLInputElement>document.getElementById('address'+i);
        var autocomplete = new google.maps.places.Autocomplete(address);

        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          var latitude = place.geometry.location.lat();
          var longitude = place.geometry.location.lng();
          console.log('Place------', place);
          console.log('latitude---', latitude);
          console.log('longitude--', longitude);
        });

      }
    });
    
  }

  getLocation() {
    console.log('------------------');
    var acInputs = document.getElementsByClassName("autocomplete");
      console.log('-------------------', acInputs);
      for (var i = 0; i < acInputs.length; i++) {
        var address = <HTMLInputElement>document.getElementById('address'+i);
        var autocomplete = new google.maps.places.Autocomplete(address);

        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          var latitude = place.geometry.location.lat();
          var longitude = place.geometry.location.lng();
          console.log('Place------', place);
          console.log('latitude---', latitude);
          console.log('longitude--', longitude);
        });

      }

      // let autocomplete = new google.maps.places.Autocomplete(acInputs[0], {
      // });
      // autocomplete.addListener("place_changed", () => {
      //   this.ngZone.run(() => {
      //     let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      //     this.latLocation = place.geometry.location.lat();
      //     console.log("latitude", this.latLocation);
      //     this.lngLocation = place.geometry.location.lng();
      //     console.log("long", this.lngLocation);
      //     this.location = place.name + ',' + place.formatted_address;
      //     console.log("location", this.location);

      //   });
      // });

      // for (var i = 0; i < acInputs.length; i++) {
      //   console.log('acInputs[i]---', acInputs[i]);
      //     // var autocomplete = new google.maps.places.Autocomplete(acInputs[i]);
      //     // autocomplete.inputId = acInputs[i].id;

      //     // google.maps.event.addListener(autocomplete, 'place_changed', function () {
      //     //     document.getElementById("log").innerHTML = 'You used input with id ' + this.inputId;
      //     // });
      // }
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

  submitForm() {
    console.log("data",this.userForm.value);
  }

  onKeydown(event) {
    console.log('onKeyDown---', event);
  }
}
