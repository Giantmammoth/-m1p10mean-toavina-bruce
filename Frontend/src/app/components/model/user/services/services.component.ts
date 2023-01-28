import { Component, Input } from '@angular/core';
import { RaService } from 'src/app/services/raService/ra.service';
import { GarageServicesModel } from './garageServicesModel';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css', './services.component.scss']
})
export class ServicesComponent {

  constructor(private services: RaService) { }

  @Input() openControllerPage?: any;

  closeControllerPage(): void {
    this.openControllerPage.opened = false;
  }

  /*
  * Pagination
  */
  navigation: any[] = [
    {
      label: "groupe",
      icon: "group_add"
    },
    {
      label: "piece",
      icon: "extension"
    },
    {
      label: "service",
      icon: "list"
    },
    {
      label: "add",
      icon: "add"
    }
  ];
  pageSelected: string = this.navigation[2].label;

  changePage(page: any): void {
    this.pageSelected = page.label;
  }

  /* ------------------------------------------------------- */

  /*
  * Data
  */
  data: any = {}

  listOfServices: any[] = [
    {
      title: "Révision",
      value: "revision"
    },
    {
      title: "Entretien régulier",
      value: "entretien"
    },
    {
      title: "Réparation",
      value: 'reparation'
    }
  ];

  servicePageSelected: string = "revision";

  @Input() selectedService?: any;


  ngOnInit(): void {
    this.services.getServicesOfGarage().subscribe(services => this.data = services)
  }

  addListOfCarService(tab: any[], e: any): any[] {
    if (e.checked) {
      tab = tab.concat(e.name);
    } else {
      tab = tab.filter((value: any) => value !== e.name)
    }
    return tab;
  }

  addToSelectedService(e: any): void {
    console.log(this.selectedService)
    switch (this.pageSelected) {
      /* Service page */
      case "service": {
        switch (this.servicePageSelected) {
          case "revision": {
            this.selectedService!.listReparation.service.revision.tasks = this.addListOfCarService(this.selectedService!.listReparation.service.revision.tasks, e);
            break;
          }
          case "entretien": {
            this.selectedService!.listReparation.service.entretien.tasks = this.addListOfCarService(this.selectedService!.listReparation.service.entretien.tasks, e);
            break;
          }
          case "reparation": {
            this.selectedService!.listReparation.service.reparation.tasks = this.addListOfCarService(this.selectedService!.listReparation.service.reparation.tasks, e);
            break;
          }
        }
        break;
      }
      /* Piece page */
      case "piece": {
        this.selectedService!.listReparation.piece.tasks = this.addListOfCarService(this.selectedService!.listReparation.piece.tasks, e);
        break;
      }
      /* Groupe page */
      case "groupe":

        break;

      default:
        break;
    }
  }

  isChecked(name: string, tab: any): boolean {
    return tab.includes(name);
  }

  sendServices() {
    this.selectedService.status = "En attente de payement";
    this.services.sendReparationList(this.selectedService);
  }

}



