import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-new-car',
  templateUrl: './add-new-car.component.html',
  styleUrls: ['./add-new-car.component.css']
})
export class AddNewCarComponent {

  @Input() toggle?: boolean;

  motor_type: string[] = ["Essence", "Diesel"]
  transmission_type: string[] = ["Manuel", "Automatique"]



}
