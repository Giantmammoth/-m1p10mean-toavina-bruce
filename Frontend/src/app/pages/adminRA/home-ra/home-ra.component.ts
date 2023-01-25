import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Car } from '../../customer-page/car';
import { GarageServicesModel } from 'src/app/components/model/user/services/garageServicesModel';
@Component({
  selector: 'app-home-ra',
  templateUrl: './home-ra.component.html',
  styleUrls: ['./home-ra.component.css'],
})
export class HomeRAComponent {
  cars: Car[] = [
    {
      im: "1235MD",
      marque: "Maruti Swift Dzire VDI",
      annee: "2014",
      moteur: "1248 CC",
      type_moteur: "Diesel",
      transmission: "Manual",
      couleur: "gris",
      reparation: new GarageServicesModel().getServicesModel()
    },
    {
      im: "5568MC",
      marque: "Skoda Rapid 1.5 TDI Ambition",
      annee: "2014",
      moteur: "1498 CC",
      type_moteur: "Diesel",
      transmission: "Manual",
      couleur: "gris metalique",
      reparation: new GarageServicesModel().getServicesModel()
    },
    {
      im: "9876WWT",
      marque: "Honda City 2017-2020 EXi",
      annee: "2006",
      moteur: "1497 CC",
      type_moteur: "Petrol",
      transmission: "Manual",
      couleur: "blanc cassé",
      reparation: new GarageServicesModel().getServicesModel()
    }
  ];

  enCours: Car[] = [
    {
      im: "9876WWT",
      marque: "Honda City 2017-2020 EXi",
      annee: "2006",
      moteur: "1497 CC",
      type_moteur: "Petrol",
      transmission: "Manual",
      couleur: "blanc cassé",
      reparation: new GarageServicesModel().getServicesModel()
    }
  ]

  drop(event: CdkDragDrop<Car[] | any>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


  /* ---------- show page ----------- */
  showServicePage: boolean = true;
  setShowServicePage(show: boolean): void {
    this.showServicePage = show
  }

  show() {
    console.log("click")
  }

  /* ---------- On select car ----------- */

  openControllerPage: boolean = false;
  selectedCar: Car = this.cars[0];
  changeSelectedCar(car: Car):void{
    if(this.selectedCar !== car) this.selectedCar = car;
    this.openControllerPage = true;
  }
}
