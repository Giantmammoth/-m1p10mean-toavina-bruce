import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DATA_LIST } from 'src/app/data/rf_data';


@Injectable({
  providedIn: 'root'
})
export class RfService {

  constructor() { }

  getData(): Observable<Object> {
    const data = of(DATA_LIST)
    return data;
  }

}
