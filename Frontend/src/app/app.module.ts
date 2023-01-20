import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HomeRAComponent } from './pages/adminRA/home-ra/home-ra.component';
import { PersonalManagmentComponent } from './pages/adminRA/personal-managment/personal-managment.component';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './pages/login-page/sign-in/sign-in.component';
import { SignUpComponent } from './pages/login-page/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { AddNewCarComponent } from './components/model/user/add-new-car/add-new-car.component';
import { CarDetailsComponent } from './components/model/user/car-details/car-details.component';
import { CarHistoryComponent } from './components/model/user/car-history/car-history.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    HomeRAComponent,
    PersonalManagmentComponent,
    SignInComponent,
    SignUpComponent,
    CustomerPageComponent,
    AddNewCarComponent,
    CarDetailsComponent,
    CarHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
