import { Component, Input } from '@angular/core';
import { Car } from 'src/app/services/customerService/car';
import { CustomerService } from 'src/app/services/customerService/customer.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css', './car-details.component.scss']
})
export class CarDetailsComponent {
  @Input() detail?: any;
  pages: string[] = ["details", "add", "user", "historique", "facture", "reparation_list"];
  pageSelected: string = "details";

  constructor(private customerService: CustomerService) { }

  sendToGarage(matricule: string) {
    const token = localStorage.getItem('x-auth-token');
    console.log(matricule);
    this.customerService.sendToGarage({ token, matricule });
  }

  navigation: any[] = [
    {
      icon: "person",
      label: "user"
    },
    {
      icon: "list",
      label: "historique"
    },
    {
      icon: "receipt long",
      label: "facture"
    },
    {
      icon: "logout",
      label: "déconnection"
    }
  ]

  changePage(page: string) {
    this.pageSelected = page;
  }


  /* Progress Bar function */
  progress: string = "15%";
  progressBar(): Object {
    const style = { 'width': this.progress };
    return style;
  }


}

