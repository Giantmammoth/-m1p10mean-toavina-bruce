import { Component, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { Car } from '../../services/customerService/car';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css', './customer-page.component.scss']
})


export class CustomerPageComponent {
  myCars: Car[] = [];
  car_details?: Car;

  constructor(private customerService: CustomerService) { }
  ngOnInit(): void {
    this.customerService.getCars().subscribe(cars => this.myCars = cars);
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
