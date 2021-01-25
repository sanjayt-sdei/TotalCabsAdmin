import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AppService } from './../app.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label, MultiDataSet } from 'ng2-charts';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { environment } from 'src/environments/environment';
import {UserService} from '../user/user.service'

declare const  google : any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'No. of Passenger' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Earning' },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Cab Drivers', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(239, 83, 80,0.2)',
      borderColor: 'rgba(239, 83, 80,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(25, 118, 210,0.2)',
      borderColor: 'rgba(25, 118, 210,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(38, 198, 218,0.3)',
      borderColor: 'rgb(38, 198, 218)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;


  public doughnutChartLabels: Label[] = ['Pending', 'Delivered', 'Order'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];
  public doughnutChartType: ChartType = 'doughnut';

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2018', '2019', '2020'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;

  public barChartData: ChartDataSets[] = [
    { data: [35, 29, 15], label: '' }
  ];

  public CompletedbarChartData: ChartDataSets[] = [
    { data: [10, 19, 15], label: '' }
  ];

  modalRef: BsModalRef;
  selectDriver: string;
  driver: string[] = [
    'Andrew',
    "Brett",
    "Cane",
    "Douggle"
  ]
  public months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  public page: number = 1;
  public declinedofJobsPage: number = 1;
  public allocatedjobsPage: number = 1;
  public allocatedJobs: any = [];
  public listOfJobs: any = [];
  public declinedofJobs: any = [];
  public userByType: any = [];
  public totalVehicles: any = 0;
  public freeVehicles: any = 0;


  filterForm = new FormGroup({
    type: new FormControl('')
  });data: any;
  showBox: any;
  showConfirmTaxiDialog: any;
  pickup: any;
  driversdata: any[];
  destination: any;
  latitude: any;
  longitude: any;
  end: { lat: any; lng: any; };
  ngZone: any;
;


  constructor(private modalService: BsModalService, private api: AppService, private formBuilder: FormBuilder,private userservice:UserService) {
  }
  
  ngOnInit() {
    let data=JSON.parse(localStorage.getItem('user_login'));
    this.latitude=28.5355;
    this.longitude=77.3910
    // this.socket = io.connect(`http://localhost:3531/?userId=${data.userId}`)


//     this.data.searchBox.subscribe(res =>{
//       this.showBox = res;
//     })
//     this.data.confirmtaxidialog.subscribe(res=>{
//       console.log(res,'res in confirmtaxidialog')
//       this.showConfirmTaxiDialog=res
//     })
//     this.data.getDestinationLoc.subscribe((marker: any) =>{
//       console.log(marker,'its reached here at marker')
//      if(marker.driver){

//       let apidata = {origin:this.pickup,destination:marker}
//   console.log(apidata,'apidata++++')
//       this.userservice.getdistance1(apidata).subscribe(res =>{

//         console.log("resdta//////",res);
        
//         this.markerOptions.destination.infoWindow=res.data.rows[0].elements[0].duration.text;
//        // console.log("res data--++----->",res.data.rows[0].elements[0].duration.text);
//        // this.distancedata.AddDistanceData(res.data)


//         this.ngZone.run(()=>{
//           console.log(res,'getdistance')
//           this.driversdata = [];
//           // this.showWindow=true
//          this.driversdata.push({lat:marker.latitude,long:marker.longitude,eta:res.data.rows[0].elements[0].duration.text})
        
//          console.log(this.driversdata,'this.driversdata+++++')
      

       
//         this.data.changeTaxiEta(res.data.rows[0].elements[0].duration.text)
        
//         // this.markerOptions.destination.icon = 'assets/images/car.png';
//         this.markerOptions.destination.infoWindow=`<p>ETA:${res.data.rows[0].elements[0].duration.text}</p>`
//        console.log({latitude:this.latitude,longitude:this.longitude},'old and new lat',{latitude:marker.latitude,longitude:marker.longitude})
//         // console.log("res data--++----->",res.data.rows[0].elements[0].duration.text);
//        // this.distancedata.AddDistanceData(res.data)
//        this.markerOptions.destination.icon ='assets/images/car.png'
//        this.end = { lat: marker.latitude, lng:  marker.longitude }
//       })
//       },err=>{console.log(err);
//       }
//       );
      
     
//      }
//      else{
//     console.log('its reached here at searchmarker+++')
//         this.destination= marker
//         this.latitude = marker.latitude;
//         this.longitude = marker.longitude;
//         this.end = { lat: marker.latitude, lng:  marker.longitude }
//      }
// } )

//     this.data.getPickupLoc.subscribe((marker: any)=>{
//       console.log("markerr--",marker);
      
      // if(marker.driver){
      //   this.driversdata = [];
      //   let apidata = {origin:marker,destination:this.destination}
  
      //   this.userservice.getdistance1(apidata).subscribe(res =>{
      //     this.markerOptions.origin.infoWindow=res.data.rows[0].elements[0].duration.text;
      //    // console.log("res data--++----->",res.data.rows[0].elements[0].duration.text);
      //    // this.distancedata.AddDistanceData(res.data)
         
      //   },err=>{console.log(err);
      //   }
      //   );
  
      //   this.markerOptions.destination.icon = 'assets/images/car.png';
      // }
        // this.pickup = marker
        // this.latitude = marker.latitude;
        // this.longitude = marker.longitude;
        // this.start = { lat: marker.latitude, lng:  marker.longitude }
     // });
      // this.data.getAlldriver.subscribe((marker: any)=>
      
      // {this.driver =marker
      //   this.latitude = marker.latitude;
      //   this.longitude = marker.longitude;
      //   this.start = { lat: marker.latitude, lang:  marker.longitude }
      //   console.log("driverrrr--->",this.start);
        
      // });
    //load Places Autocomplete
  //   this.mapsAPILoader.load().then(() => {
  //     this.setCurrentLocation();
  //     this.getdriverlist();
  //     this.geoCoder = new google.maps.Geocoder;
  
  //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
  //     autocomplete.addListener("place_changed", () => {
  //       this.ngZone.run(() => {
  //         //get the place result
  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
  //         //verify result
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }
  
  //         //set latitude, longitude and zoom
  //         this.latitude = place.geometry.location.lat();
  //         this.longitude = place.geometry.location.lng();
  //         this.zoom = 12;
  //         this.getDriverData(this.latitude,this.longitude);
  //       });
  //     });
  //   });
   }

  
  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getPaymentList(params?: any) {
    this.api.callApi(`${environment.backendBaseURL}/api/admin/dashboard`, 'POST', {}, { params }).subscribe(res => {
      this.allocatedJobs = res['data'].allocatedJobs;
      this.listOfJobs = res['data'].listOfJobs;
      this.declinedofJobs = res['data'].declinedJob;
      this.userByType = res['data'].userByType;
      this.totalVehicles = res['data'].TotalVehicles;
      this.freeVehicles = res['data'].freevehciles;
      console.log('this is lee', this.listOfJobs.length)
    });
  }

  handleSelect() {
    const { value } = this.filterForm;
    console.log('cllic', value)
    this.getPaymentList(value)
  }



}
