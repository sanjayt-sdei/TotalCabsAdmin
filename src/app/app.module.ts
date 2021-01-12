import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DriverComponent } from './driver/driver.component';
import { UserComponent } from './user/user.component';
import { DriverDetailComponent } from './driver/driver-detail/driver-detail.component';
import { DriversListComponent } from './driver/drivers-list/drivers-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { AddDriverComponent } from './driver/add-driver/add-driver.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';
import { InvoiceComponent } from './payment/invoice/invoice.component';

import { HttpClientModule } from '@angular/common/http';
import { EditDriverComponent } from './driver/edit-driver/edit-driver.component';
import { ReactiveFormsModule } from '@angular/forms';


import { DashboardComponent } from './dashboard/dashboard.component';
import { MapsComponent } from './maps/maps.component';
import { ChatComponent } from './chat/chat.component';
import { ReportsComponent } from './reports/reports.component';
import { AddUsersComponent } from './user/add-users/add-users.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { LoginComponent } from './shared/guard/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { JobComponent } from './job/job.component';
import { JobListComponent } from './job/job-list/job-list.component';
import { OngoingJobsComponent } from './job/ongoing-jobs/ongoing-jobs.component';
import { CompletedJobsComponent } from './job/completed-jobs/completed-jobs.component';
 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DriverComponent,
    UserComponent,
    DriverDetailComponent,
    DriversListComponent,
    UserListComponent,
    UserDetailComponent,
    AddDriverComponent,
    PaymentComponent,
    PaymentListComponent,
    InvoiceComponent,
    DashboardComponent,
    EditDriverComponent,
    MapsComponent,
    ChatComponent,
    ReportsComponent,
    AddUsersComponent,
    EditUserComponent,
    LoginComponent,
    JobComponent,
    JobListComponent,
    OngoingJobsComponent,
    CompletedJobsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ChartsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
