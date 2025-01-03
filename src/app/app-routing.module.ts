import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { LandingViewComponent } from './landing-page/landing-view/landing-view.component';
import { RegistrationComponent } from './register/registration/registration.component';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
import { LoanschemesComponent } from './user/loanschemes/loanschemes.component';
import { PaymentComponent } from './user/payment/payment.component';
import { QueriesComponent } from './user/queries/queries.component';
import { ApplyloanComponent } from './user/applyloan/applyloan.component';
import { AllappliedloanComponent } from './user/allappliedloan/allappliedloan.component';
import { UpdateprofileComponent } from './user/updateprofile/updateprofile.component';
import { ViewemiComponent } from './user/viewemi/viewemi.component';
import { LoanofficerdashboardComponent } from './loanofficer/loanofficerdashboard/loanofficerdashboard.component';
import { ViewloanrequestComponent } from './loanofficer/viewloanrequest/viewloanrequest.component';
import { PendingloanrequestComponent } from './loanofficer/pendingloanrequest/pendingloanrequest.component';
import { ProfileComponent } from './loanofficer/profile/profile.component';


const routes: Routes = [
  {
    path: "",
    component: LandingViewComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegistrationComponent
      },

    ]
  },
  {
    path: "userdashboard",
    component: UserdashboardComponent,
    children: [
      {
        path: "loanschemes",
        component: LoanschemesComponent,
        children: [
          {
            path: "applyloan",
            component: ApplyloanComponent
          }
        ]
      },
      {
        path: "payment",
        component: PaymentComponent
      },
      {
        path: "viewEmi",
        component: ViewemiComponent
      },
      {
        path: "queries",
        component: QueriesComponent
      },
      {
        path: "appliedloans",
        component: AllappliedloanComponent
      },
      {
        path: "updateprofile",
        component: UpdateprofileComponent
      }
    ]
  },
  {
    path:"loanofficerdashboard",
    component:LoanofficerdashboardComponent,
    children:[
      {
        path:"loanrequest",
        component:ViewloanrequestComponent
      },
      {
        path:"pendingloanrequest",
        component:PendingloanrequestComponent
      },
      {
        path:"profile",
        component:ProfileComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
