import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Car } from '../../../services/customerService/car';
import { GarageServicesModel } from 'src/app/components/model/user/services/garageServicesModel';
import { RaService } from 'src/app/services/raService/ra.service';
@Component({
  selector: 'app-home-ra',
  templateUrl: './home-ra.component.html',
  styleUrls: ['./home-ra.component.css', './home-ra.component.scss'],
})
export class HomeRAComponent {
  cars: Car[] = [];

  constructor(private garageService: RaService) { }

  ngOnInit(): void {
    this.garageService.getCars().subscribe(cars => this.cars = cars);
  }


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

  /* ---------- On select car ----------- */

  openControllerPage: boolean = false;
  selectedCar: Car = this.cars[0] || new GarageServicesModel().getServicesModel();
  changeSelectedCar(car: Car): void {
    if (this.selectedCar !== car) this.selectedCar = car;
    this.openControllerPage = true;
  }

  openDetailsPage: boolean = false;
  carSelectedToShowDetails: Car = this.enCours[0];
  changeCarSelectedToShowDetails(car: Car): void {
    if (this.carSelectedToShowDetails !== car) this.carSelectedToShowDetails = car;
    this.openDetailsPage = true;
  }

}
