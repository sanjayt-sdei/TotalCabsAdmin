import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DispachService } from '../dispach.service';

@Component({
  selector: 'app-diapach-list',
  templateUrl: './diapach-list.component.html',
  styleUrls: ['./diapach-list.component.scss']
})
export class DiapachListComponent implements OnInit {
  cabList: any;

  constructor(
    private service: DispachService,
    private http: HttpClient,
    private fb: FormBuilder,
    private navRoute: Router,
    private route: ActivatedRoute,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getCabList();
  }
 getCabList(){
    this.service.getCabList().subscribe(res => {
      if (res && res.code == 200) {
        console.log(res)
        this.cabList = res.data
        console.log("guest", this.cabList);
      } else {
        console.log('Error');

      }
    }
    );
  }

}
