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
import { WaitingListModelComponent } from './components/model/waiting-list-model/waiting-list-model.component';
import { InProgressListModelComponent } from './components/model/in-progress-list-model/in-progress-list-model.component';
import { OutputListModelComponent } from './components/model/output-list-model/output-list-model.component';
import { ShowInformationModelComponent } from './components/model/show-information-model/show-information-model.component';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './pages/login-page/sign-in/sign-in.component';
import { SignUpComponent } from './pages/login-page/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    HomeRAComponent,
    PersonalManagmentComponent,
    WaitingListModelComponent,
    InProgressListModelComponent,
    OutputListModelComponent,
    ShowInformationModelComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
