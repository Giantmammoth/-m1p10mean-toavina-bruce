import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRAComponent } from './pages/adminRA/home-ra/home-ra.component';
import { HomeRFComponent } from './pages/adminRF/home-rf/home-rf.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  { path: "adminResponsableAtelier", component: HomeRAComponent },
  { path: "adminResponsableFinancier", component: HomeRFComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
