import { Component, Input } from '@angular/core';
import { Car } from 'src/app/pages/customer-page/car';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css', './car-details.component.scss']
})
export class CarDetailsComponent {
  @Input() detail?: Car;
  selected: string = "Details";
  titles: string[] = ["Details", "History", "Maintenance"]


  setSelected(title: string): void {
    this.selected = title;
  }
}
