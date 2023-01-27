import { Injectable } from '@angular/core';
import { CAR } from 'src/app/data/car_data';
import { Car } from './car';
import { Observable, of } from 'rxjs'
import { WebRequestService } from '../webRequest/web-request.service';
import { LoginService } from '../login/login.service';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly root = 'Car';
  socket = io.connect("http://localhost:5000");

  constructor(private webServices: WebRequestService, private authService: LoginService) {

  }

  getCars() {
    return this.webServices.get(`${this.root}/`);
  }

  addNewCar(data: Object) {
    return this.webServices.post(`${this.root}/`, data);
  }

  message(mess: string) {
    this.socket.emit("message", mess);
  }

  sendToGarage(data: any) {
    this.socket.emit("send to garage", data);
  }

}
