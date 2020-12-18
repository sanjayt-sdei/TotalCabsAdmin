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
import { EditDriverComponent} from './driver/edit-driver/edit-driver.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapsComponent } from './maps/maps.component';
import { ChatComponent } from './chat/chat.component';
import { ReportsComponent } from './reports/reports.component';
import {AddUsersComponent } from './user/add-users/add-users.component'
import {EditUserComponent} from './user/edit-user/edit-user.component';
import { LoginComponent } from './shared/guard/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginComponent
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
        path: 'edit/:id',
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
        path: ':id/details',
        component: UserDetailComponent
      },
      {
        path: 'add',
        component: AddUsersComponent
      },
      {
        path: 'edit/:id',
        component: EditUserComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
