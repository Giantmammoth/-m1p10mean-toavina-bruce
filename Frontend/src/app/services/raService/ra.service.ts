import { Injectable } from '@angular/core';
import { Car } from '../customerService/car';
import { GarageCarData, GarageData } from 'src/app/data/garageDataCars';
import { Observable, of } from 'rxjs';
import { GarageServicesModel } from 'src/app/components/model/user/services/garageServicesModel';

@Injectable({
  providedIn: 'root'
})
export class RaService {

  constructor() { }

  getCars(): Observable<Car[]> {
    const cars = of(GarageCarData);
    return cars;
  }

  getServicesOfGarage(): Observable<Object> {
    const services = of(GarageData);
    return services;
  }


}
