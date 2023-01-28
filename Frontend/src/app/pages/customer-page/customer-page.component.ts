import { HttpResponse } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { RaService } from 'src/app/services/raService/ra.service';
import { Car } from '../../services/customerService/car';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css', './customer-page.component.scss']
})


export class CustomerPageComponent {
  myCars: any = [];
  car_details?: any;

  constructor(private customerService: CustomerService, private router: Router) {
    this.customerService.getReparationList().subscribe((data: any) => {
      this.myCars = this.myCars.map((car: any) => {
        if (car._id === data._id) {
          return data;
        }
        return car;
      })
      this.car_details = this.myCars[0];
      console.log(this.myCars);
    })
  }
  ngOnInit(): void {
    this.customerService.getCars().subscribe(cars => {
      this.myCars = cars
    });

    this.customerService.newData().subscribe((data) => {
      this.myCars = this.myCars.concat(data);
    })

  }

  viewDetails(car: Car, pageToShow: any): void {
    this.car_details = car;
    pageToShow.pageSelected = "details"
  }

  @ViewChild('inputTest') input?: ElementRef<HTMLInputElement>;

  hello(): void {
    console.log(this.input?.nativeElement.value);
  }


  sendToGarage(detail: any) {
    const token = localStorage.getItem('x-auth-token');
    this.customerService.sendToGarage({ data: detail, token });
  }

  status(car: any): boolean {
    if (car.status == "En attente de payement") {
      return true;
    }
    return false;
  }
}
