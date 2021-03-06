import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverComponent } from './driver/driver.component';
import { UserComponent } from './user/user.component';
import { DriverDetailComponent } from './driver/driver-detail/driver-detail.component';
import { DriversListComponent } from './driver/drivers-list/drivers-list.component';
import { AddDriverComponent } from './driver/add-driver/add-driver.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';
import { InvoiceComponent } from './payment/invoice/invoice.component';
import { EditDriverComponent } from './driver/edit-driver/edit-driver.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapsComponent } from './maps/maps.component';
import { ChatComponent } from './chat/chat.component';
import { ReportsComponent } from './reports/reports.component';
import { AddUsersComponent } from './user/add-users/add-users.component'
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { LoginComponent } from './shared/guard/login/login.component';
import { JobComponent } from './job/job.component';
import { JobListComponent } from './job/job-list/job-list.component';
import { OngoingJobsComponent } from './job/ongoing-jobs/ongoing-jobs.component';
import { CompletedJobsComponent } from './job/completed-jobs/completed-jobs.component';
import { DispachComponent } from './dispach/dispach.component';
import { DiapachListComponent } from './dispach/diapach-list/diapach-list.component';
import { AddDispachComponent } from './dispach/add-dispach/add-dispach.component';
import { BookingDetailsComponent } from './bookings/booking-details/booking-details.component';
import { BookingsListComponent } from './bookings/bookings-list/bookings-list.component';
import { BookingsComponent } from './bookings/bookings.component';

const routes: Routes = [
{
path: '',
redirectTo: 'dashboard',
pathMatch: 'full'
},
{
path: 'login',
component: LoginComponent
},
{
path: 'dashboard',
component: DashboardComponent
},
{
path: 'chat',
component: ChatComponent
},
{
path: 'maps',
component: MapsComponent
},
{
path: 'reports',
component: ReportsComponent
},
{
path: 'drivers',
component: DriverComponent,
children: [
{
path: '',
component: DriversListComponent
},
{
path: 'details',
component: DriverDetailComponent
},
{
path: 'add',
component: AddDriverComponent
},
{
path: 'edit',
component: EditDriverComponent
},


{
path: '**',
component: DriversListComponent
}
]
},
{
path: 'users',
component: UserComponent,
children: [
{
path: '',
component: UserListComponent
},
{
path: 'details',
component: UserDetailComponent
},
{
path: 'add',
component: AddUsersComponent
},
{
path: 'edit',
component: EditUserComponent
}
]

},
{
path: 'jobs',
component: JobComponent,
children: [
{
path: '',
component: JobListComponent
},
{
path: 'ongoing',
component: OngoingJobsComponent
},
{
path: 'completed',
component: CompletedJobsComponent
},
{
path: '**',
component: JobListComponent

}
]
},
{
path:'dispach',
component:DispachComponent,
children:[
{
path:'',
component:DiapachListComponent
},
{
path:'add',
component:AddDispachComponent
},
{
path: '**',
component: DiapachListComponent

}
]
},
{
path: 'payment',
component: PaymentComponent,
children: [
{
path: '',
component: PaymentListComponent
},
{
path: ':id/invoice',
component: InvoiceComponent
}
]
},
{
path: 'bookings',
component: BookingsComponent,
children: [
{
path: '',
component: BookingsListComponent
},
{
path: ':id',
component: InvoiceComponent
}
]
}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }