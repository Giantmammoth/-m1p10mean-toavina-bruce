import { Component, ViewChild, ElementRef } from '@angular/core';
import { Car } from './car';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css', './customer-page.component.scss']
})


export class CustomerPageComponent {

  /* add button status */
  add_button_status = {
    status: true,
    text: "add"
  }
  toggleAddButtonStatus(): void {
    this.add_button_status.status = !this.add_button_status.status
    this.add_button_status.text = this.add_button_status.status ? "add" : "close";
  }
  /* ----------------- */

  myCars: Car[] = [
    {
      im: "1235MD",
      marque: "Maruti Swift Dzire VDI",
      annee: "2014",
      moteur: "1248 CC",
      type_moteur: "Diesel",
      transmission: "Manual",
      couleur: "gris",
      reparation: [""]
    },
    {
      im: "5568MC",
      marque: "Skoda Rapid 1.5 TDI Ambition",
      annee: "2014",
      moteur: "1498 CC",
      type_moteur: "Diesel",
      transmission: "Manual",
      couleur: "gris metalique",
      reparation: [""]
    },
    {
      im: "9876WWT",
      marque: "Honda City 2017-2020 EXi",
      annee: "2006",
      moteur: "1497 CC",
      type_moteur: "Petrol",
      transmission: "Manual",
      couleur: "blanc cassé",
      reparation: [""]
    }
  ];

  car_details?: Car;

  viewDetails(car: Car): void {
    this.car_details = car;
  }

  @ViewChild('inputTest') input?: ElementRef<HTMLInputElement>;

  hello(): void {
    console.log(this.input?.nativeElement.value);
  }



}
