import { Injectable } from '@angular/core';
import { Car } from '../customerService/car';
import { GarageCarData, GarageData } from 'src/app/data/garageDataCars';
import { Observable, of } from 'rxjs';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class RaService {
  socket = io.connect("http://localhost:5000");
  constructor() { }

  getCars(): Observable<Car[]> {
    const cars = of(GarageCarData);
    return cars;
  }

  getServicesOfGarage(): Observable<Object> {
    const services = of(GarageData);
    return services;
  }

  newData() {
    /* this.socket.on('connect', () => {
      console.log("Responsable atelier")

      this.socket.on("data load", (data) => {
        console.log(carList.concat(data));
      })

    }) */

    let observable = new Observable<any[]>((observer): any => {
      this.socket.on("data load", (data) => {
        observer.next(data);
      })
      return () => { this.socket.disconnect() };
    })

    return observable;
  }

}
