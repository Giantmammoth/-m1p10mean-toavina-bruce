import { Injectable } from '@angular/core';
import { CAR } from 'src/app/data/car_data';
import { Car } from './car';
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getCars(): Observable<Car[]> {
    const car = of(CAR);
    return car;
  }

}
