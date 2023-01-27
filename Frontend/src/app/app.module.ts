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
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './pages/login-page/sign-in/sign-in.component';
import { SignUpComponent } from './pages/login-page/sign-up/sign-up.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ServicesComponent } from './components/model/user/services/services.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ShowDetailsComponent } from './components/model/user/show-details/show-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeRFComponent } from './pages/adminRF/home-rf/home-rf.component';
import { MatSortModule } from '@angular/material/sort';
import { TableauComponent } from './components/model/all/tableau/tableau.component';
import { FactureComponent } from './components/model/all/facture/facture.component';
import { WebRequestInterceptor } from './services/webRequest/web-request.interceptor.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: "http://localhost:5000/", // socket server url;
  options: {
    transports: ['websocket']
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    HomeRAComponent,
    SignInComponent,
    SignUpComponent,
    CustomerPageComponent,
    AddNewCarComponent,
    CarDetailsComponent,
    CarHistoryComponent,
    ServicesComponent,
    ShowDetailsComponent,
    HomeRFComponent,
    TableauComponent,
    FactureComponent,
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
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSortModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
