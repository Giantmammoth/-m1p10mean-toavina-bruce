import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRAComponent } from './pages/adminRA/home-ra/home-ra.component';
import { HomeRFComponent } from './pages/adminRF/home-rf/home-rf.component';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignInComponent } from './pages/login-page/sign-in/sign-in.component';
import { SignUpComponent } from './pages/login-page/sign-up/sign-up.component';

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: "", component: HomePageComponent },
  { path: "adminResponsableAtelier", component: HomeRAComponent },
  { path: "adminResponsableFinancier", component: HomeRFComponent },
  { path: "signIn", component: SignInComponent },
  { path: "signUp", component: SignUpComponent },
  { path: "customer", component: CustomerPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
