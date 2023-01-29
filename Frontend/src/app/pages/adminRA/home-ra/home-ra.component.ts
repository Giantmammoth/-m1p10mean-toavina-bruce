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
  cars: any = [];
  selectedCar: any;
  firstclick = false;

  constructor(private garageService: RaService) { }

  ngOnInit(): void {
    this.garageService.getCars().subscribe((cars: any) => {
      console.log("Garage Data")
      this.cars = cars;
      this.reloadData();
    })
    this.garageService.newData().subscribe((data: any) => {
      let isIn = this.cars.some((car: any) => car._id == data._id);
      if (!isIn) {
        this.cars = this.cars.concat(data);
        this.reloadData();
      }
    })

    this.garageService.confirmStatus().subscribe((data: any) => {
      this.cars = this.cars.map((car: any) => {
        if (car._id == data._id) {
          car.status = "payé";
          return car;
        } else {
          return car
        }
      })
    })

  }

  reloadData() {
    this.cars = this.cars.map((car: any) => {
      return { ...car, listReparation: new GarageServicesModel().getServicesModel() }
    });
    this.selectedCar = this.cars[0]
  }

  enCours: any = []

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
  changeSelectedCar(car: any): void {
    if (!this.firstclick) this.firstclick = true
    if (this.selectedCar.status == "En attente") {
      this.openControllerPage = true;
    }
    if (this.selectedCar !== car) this.selectedCar = car;
  }

  openDetailsPage: boolean = false;
  carSelectedToShowDetails: Car = this.enCours[0];
  changeCarSelectedToShowDetails(car: Car): void {
    if (this.carSelectedToShowDetails !== car) this.carSelectedToShowDetails = car;
    this.openDetailsPage = true;
  }

  confirm(car: any) {
    if (car.status != "payé") {
      return true;
    } else {
      return false;
    }
  }
}
