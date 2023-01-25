import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { GarageServicesModel } from '../services/garageServicesModel';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent {
  @Input() openDetailsPage?: any;
  closeDetailsPage(): void {
    this.openDetailsPage.opened = false;
  }

  @Input() reparationDetails: any = new GarageServicesModel().getServicesModel();

  services: any = Object
    .keys(this.reparationDetails.service)
    .filter((value: string) => value !== "title")
    .map((key: string): any => {

      this.reparationDetails.service[key].tasks = ["Lorem ipsum dolor", " sit amet consectetur", " adipisicing elit.", "Nihil iste quas unde!"];
      this.reparationDetails.piece.tasks = ["Lorem ipsum dolor", " sit amet consectetur", " adipisicing elit.", "Nihil iste quas unde!"];

      return {
        title: this.reparationDetails.service[key].title,
        tasks: this.reparationDetails.service[key].tasks.map((value: any) => { return { name: value, done: false } })
      }
    });

  pieces: any = {
    title: this.reparationDetails.piece.title,
    tasks: this.reparationDetails.piece.tasks.map((value: any) => { return { name: value, done: false } })
  };


  toggleStatus(status: any): void {
    status.done = !status.done
  }

}
