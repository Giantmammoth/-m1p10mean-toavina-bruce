import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DATA_LIST } from 'src/app/data/rf_data';
import { WebRequestService } from '../webRequest/web-request.service';


@Injectable({
  providedIn: 'root'
})
export class RfService {

  constructor(private webService: WebRequestService) { }

  getData() {
    return this.webService.get("Garage/carListToPay");
  }

  reloadData() {
    let observable = new Observable<any>((observer) => {
      this.webService.On("payement", (data: any) => {
        observer.next(data);
      })
      return () => { this.webService.Disconnect() };
    })
    return observable;
  }
  confirm(data: any) {
    this.webService.Emit("confirm payement", data);
  }

}
