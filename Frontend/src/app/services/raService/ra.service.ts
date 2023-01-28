import { Injectable } from '@angular/core';
import { Car } from '../customerService/car';
import { GarageData } from 'src/app/data/garageDataCars';
import { Observable, of } from 'rxjs';

import { WebRequestService } from '../webRequest/web-request.service';
@Injectable({
  providedIn: 'root'
})
export class RaService {
  constructor(private webService: WebRequestService) { }

  getCars(): any {
    return this.webService.get("Garage/carList");
  }

  getServicesOfGarage(): Observable<Object> {
    const services = of(GarageData);
    return services;
  }

  sendReparationList(car: any) {
    this.webService.Emit("send service", car);
  }


  newData() {
    let observable = new Observable<any[]>((observer): any => {
      this.webService.On("data load", (data: any) => {
        observer.next(data);
      })
      return () => { this.webService.Disconnect() };
    })

    return observable;
  }

}
