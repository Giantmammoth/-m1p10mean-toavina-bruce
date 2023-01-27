import { HttpResponse } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { Car } from '../../services/customerService/car';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css', './customer-page.component.scss']
})


export class CustomerPageComponent {
  myCars: any = [];
  car_details?: any;

  constructor(private customerService: CustomerService, private router: Router) { }
  ngOnInit(): void {
    this.customerService.getCars().subscribe(cars => {
      this.myCars = cars
    });
  }

  showMessage() {
    this.customerService.message("test socket service is get ready");
  }

  viewDetails(car: Car, pageToShow: any): void {
    this.car_details = car;
    pageToShow.pageSelected = "details"
  }

  @ViewChild('inputTest') input?: ElementRef<HTMLInputElement>;

  hello(): void {
    console.log(this.input?.nativeElement.value);
  }


}
