import { GarageServicesModel } from "../components/model/user/services/garageServicesModel";
import { Car } from "../services/customerService/car";


export const GarageData = {
  services: {
    revision: ["direction / 40000 MGA / 1 jour", "visibilité / 40000 MGA / 1 jour", "éclairage / 40000 MGA / 1 jour", "liaison au sol / 40000 MGA / 1 jour"],
    entretien: [
      {
        title: "Vérifications",
        tasks: ["pare-brise / 20000 MGA / 1 jour", "feux / 20000 MGA / 1 jour", "essuie-glaces / 20000 MGA / 1 jour", "contrôles internes et externes / 20000 MGA / 1 jour"]
      },
      {
        title: "Moteur",
        tasks: ["niveau de l’huile / 20000 MGA / 1 jour", "huile de frein / 20000 MGA / 1 jour", "liquide de refroidissement / 20000 MGA / 1 jour", "liquide lave-glace / 20000 MGA / 1 jour"]
      },
      {
        title: "Pneumatique",
        tasks: ["indicateurs d’usure / 20000 MGA / 1 jour", "état des flancs / 20000 MGA / 1 jour"]
      },
      {
        title: "Tableau de bord",
        tasks: ["allumage / 20000 MGA / 1 jour", "dépollution / 20000 MGA / 1 jour"]
      }
    ],
    reparation: ["châssis / 50000 MGA / 1 jour", "Pédale d’embrayage / 50000 MGA / 1 jour", "Pédale de frein / 50000 MGA / 1 jour", "Pédale d’accélérateur / 50000 MGA / 1 jour", "boîte de vitesses / 50000 MGA / 1 jour"]
  },
  piece: ["filtre à air / 40000 MGA ", "ressort de soupape / 40000 MGA", "allumeur / 40000 MGA", "alternateur / 40000 MGA", "courroie de ventilation/ 40000 MGA",
   "pompe à eau / 40000 MGA", "poulie / 40000 MGA", "durite du radiateur / 40000 MGA", "chambres de combustion / 40000 MGA", "bouchons de remplissage et de vidange d’huile / 40000 MGA",
    "jauge d’huile / 40000 MGA", "pompe à essence / 40000 MGA", "système de canalisation du carburant / 40000 MGA", "bloc d’admission / 40000 MGA", "couvercle de culasse / 40000 MGA", "bougies, avec leurs câbles et leurs gaines / 40000 MGA", "collecteur d’échappement / 40000 MGA", "volant / 40000 MGA", "bloc moteur / 40000 MGA", "tuyau d’échappement / 40000 MGA"],
  groupe: {
    "groupe 1": [],
    "groupe 2": [],
    "groupe 3": []
  },
};


