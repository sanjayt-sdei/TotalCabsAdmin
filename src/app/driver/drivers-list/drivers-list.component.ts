import { Component, OnInit } from '@angular/core';
import { DriverServiceService } from '../driver-service.service';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { ToastrService } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss']
})
export class DriversListComponent implements OnInit {
  guests: any;
  showModal: boolean;
  data: any;

  constructor(private service: DriverServiceService,
    private http: HttpClient,
    private _toastr: ToastrService,
    private navRoute: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log('hhhhhhh')
    this.getdriverList();
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

  close(){
    this.showModal=false; 
  }

  getId(rowData: any) {
    this.data = rowData;
    this.showModal=true;
  }
  Edit(id: number) {
    // console.log("hhhhh", id);
    //  id=Id;
    this.navRoute.navigate(['/drivers/edit/'], { queryParams: { userId: id } });
  }

  veiwDriver(id: number) {
    console.log("hhhhh", id);
    this.navRoute.navigate(['/drivers/details/'], { queryParams: { userId: id } });
  }

  deleteDriver() {
    console.log("id",this.data)
    var data = { "_id": this.data }
    this.service.deleteDriver(data).subscribe(res => {
      if (res && res.status == 200) {
        console.log(res);
        this._toastr.success("Driver has been delete Successfully !!", "Driver");
        this.getdriverList();
        this.close();
      } else {
        this._toastr.info("Error", "Doctor");

      }
    })
  }
}