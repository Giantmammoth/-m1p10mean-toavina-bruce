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

  sendToGarage(detail: any) {
    const token = localStorage.getItem('x-auth-token');
    this.customerService.sendToGarage({ data: detail, token });
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

  status(): boolean {
    if (this.detail.status == "En attente de payement") {
      return true;
    }
    return false;
  }


  services: any;
  pieces: any;

  show(car_detail: any) {
    this.detail = car_detail;
    this.pageSelected = 'reparation_list'
    this.services = Object
      .keys(this.detail.listReparation.service)
      .filter((value: string) => value !== "title")
      .map((key: string): any => {

        return {
          title: this.detail.listReparation.service[key].title,
          tasks: this.detail.listReparation.service[key].tasks.map((value: any) => { return { name: value, done: false } })
        }
      });

    this.pieces = {
      title: this.detail.listReparation.piece.title,
      tasks: this.detail.listReparation.piece.tasks.map((value: any) => { return { name: value, done: false } })
    };
  }


  toggleStatus(status: any): void {
    status.done = !status.done
    console.log(status)
  }

  sendButtonClicked: boolean = false;
  sendConfirmList() {
    this.sendButtonClicked = true;
    console.log(this.detail.listReparation);
  }

}

