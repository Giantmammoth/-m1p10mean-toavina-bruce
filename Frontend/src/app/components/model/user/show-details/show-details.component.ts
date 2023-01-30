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
    .map((key: string): any => {

      return {
        title: this.reparationDetails.service[key].title,
        tasks: this.reparationDetails.service[key].tasks.map((value: any) => { return { name: value, done: false } })
      }
    });

  pieces: any = {
    title: this.reparationDetails.piece.title,
    tasks: this.reparationDetails.piece.tasks.map((value: any) => { return { name: value, done: false } })
  };

  show() {
    console.log(this.reparationDetails)
  }

  toggleStatus(status: any): void {
    status.done = !status.done
  }

}
