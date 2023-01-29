import { Injectable } from '@angular/core';
import { CAR } from 'src/app/data/car_data';
import { Car } from './car';
import { Observable, of } from 'rxjs'
import { WebRequestService } from '../webRequest/web-request.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly root = 'Car';

  constructor(private webServices: WebRequestService, private authService: LoginService) {
  }

  getCars() {
    return this.webServices.get(`${this.root}/`);
  }
  newData() {
    let observable = new Observable<any[]>((observer): any => {
      this.webServices.On("new", (data: any) => {
        console.log("New data on customer")
        observer.next(data);
      })
      return () => { this.webServices.Disconnect() };
    })

    return observable;
  }


  addNewCar(data: any) {
    this.webServices.Emit("add", data);
  }

  message(mess: string) {
    this.webServices.Emit("message", mess);
  }

  sendToGarage(data: any) {
    this.webServices.patch(`${this.root}/`, data.data);
    this.webServices.Emit("send to garage", data);
  }

  getReparationList() {
    /* l
      this.webServices.on("list", (data) => {
        console.log(data);
        observer.next(data);
      })

    return observable; */
    let observable = new Observable<any[]>((observer): any => {
      this.webServices.On("list reparation", (data: any) => {
        observer.next(data);
      })
      return () => { this.webServices.Disconnect() };
    })
    return observable;
  }

  confirmReparationList(data: any) {
    this.webServices.Emit("confirm", data);
  }

}
