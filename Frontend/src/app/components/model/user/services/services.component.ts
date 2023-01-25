import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css', './services.component.scss']
})
export class ServicesComponent {
  @Input() openControllerPage?: any;
  closeControllerPage(): void {
    this.openControllerPage.opened = false;
  }
  /*
  *
  */

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
  data: any = {
    services: {
      revision: ["direction", "visibilité", "éclairage", "liaison au sol", "mécanique", "niveau de pollution", "carrosserie"],
      entretien: [
        {
          title: "Vérifications",
          tasks: ["pare-brise", "feux", "essuie-glaces", "contrôles internes et externes"]
        },
        {
          title: "Moteur",
          tasks: ["niveau de l’huile", "huile de frein", "liquide de refroidissement", "liquide lave-glace"]
        },
        {
          title: "Pneumatique",
          tasks: ["indicateurs d’usure", "état des flancs"]
        },
        {
          title: "Tableau de bord",
          tasks: ["allumage", "dépollution"]
        }
      ],
      reparation: ["châssis", "Pédale d’embrayage", "Pédale de frein", "Pédale d’accélérateur", "boîte de vitesses", "embrayage", "suspensions", "remise en état des pneus", "plaquettes de frein", "amortisseurs"]
    },
    piece: ["filtre à air", "ressort de soupape", "allumeur", "alternateur", "courroie de ventilation", "pompe à eau", "poulie", "durite du radiateur", "chambres de combustion", "bouchons de remplissage et de vidange d’huile", "jauge d’huile", "pompe à essence", "système de canalisation du carburant", "bloc d’admission", "couvercle de culasse", "bougies, avec leurs câbles et leurs gaines", "collecteur d’échappement", "volant", "bloc moteur", "tuyau d’échappement"],
    groupe: {
      "groupe 1": [],
      "groupe 2": [],
      "groupe 3": []
    },
  }

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

  addListOfCarService(tab: any[], e: any): any[] {
    if (e.checked) {
      tab = tab.concat(e.name);
    } else {
      tab = tab.filter((value: any) => value !== e.name)
    }
    return tab;
  }

  addToSelectedService(e: any): void {
    switch (this.pageSelected) {
      /* Service page */
      case "service": {
        switch (this.servicePageSelected) {
          case "revision": {
            this.selectedService!.service.revision.tasks = this.addListOfCarService(this.selectedService!.service.revision.tasks, e);
            break;
          }
          case "entretien": {
            this.selectedService!.service.entretien.tasks = this.addListOfCarService(this.selectedService!.service.entretien.tasks, e);
            break;
          }
          case "reparation": {
            this.selectedService!.service.reparation.tasks = this.addListOfCarService(this.selectedService!.service.reparation.tasks, e);
            break;
          }
        }
        break;
      }
      /* Piece page */
      case "piece": {
        this.selectedService!.piece.tasks = this.addListOfCarService(this.selectedService!.piece.tasks, e);
        break;
      }
      /* Groupe page */
      case "groupe":

        break;

      default:
        break;
    }
  }

  isChecked(name: string, tab: any[]): boolean {
    return tab.includes(name);
  }

  showSelected() {
    console.log(this.selectedService!);
  }

}



