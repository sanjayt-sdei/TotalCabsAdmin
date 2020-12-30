import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { JobService } from '../job.service';


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  modalRef: BsModalRef;
  tempData: any;


  constructor(
    private modalService: BsModalService,
    private service: JobService
  ) { }

  ngOnInit(): void {
    this.getCoverJobList();
  }

  getCoverJobList() {
    this.service.getAllCoverJob().subscribe(res => {
      if (res && res.code == 200) {
        console.log(res)
        this.tempData = res.data
        console.log("tempData", this.tempData);

      } else {
        console.log('Error');

      }
    }
    );
  }






  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
