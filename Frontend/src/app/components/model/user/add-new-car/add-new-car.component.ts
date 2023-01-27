import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from 'src/app/services/customerService/customer.service';

@Component({
  selector: 'app-add-new-car',
  templateUrl: './add-new-car.component.html',
  styleUrls: ['./add-new-car.component.css', './add-new-car.component.scss']
})
export class AddNewCarComponent {

  @Input() toggle?: boolean;

  model?: string;
  type?: string;
  matricule?: string;
  constructor(private customerService: CustomerService) { }

  addCar() {
    const data = {
      model: this.model,
      type: this.type,
      matricule: this.matricule,
    }

    this.customerService.addNewCar(data).subscribe((res: any) => {
      console.log(res)
    })
  }

}


