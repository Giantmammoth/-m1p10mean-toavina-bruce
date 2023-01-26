import { GarageServicesModel } from "../components/model/user/services/garageServicesModel";
import { Car } from "../services/customerService/car";


export const GarageData = {
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
};

export const GarageCarData = [
  {
    im: "1235MD",
    marque: "Maruti Swift Dzire VDI",
    annee: "2014",
    moteur: "1248 CC",
    type_moteur: "Diesel",
    transmission: "Manual",
    couleur: "gris",
    reparation: new GarageServicesModel().getServicesModel()
  },
  {
    im: "5568MC",
    marque: "Skoda Rapid 1.5 TDI Ambition",
    annee: "2014",
    moteur: "1498 CC",
    type_moteur: "Diesel",
    transmission: "Manual",
    couleur: "gris metalique",
    reparation: new GarageServicesModel().getServicesModel()
  },
  {
    im: "9876WWT",
    marque: "Honda City 2017-2020 EXi",
    annee: "2006",
    moteur: "1497 CC",
    type_moteur: "Petrol",
    transmission: "Manual",
    couleur: "blanc cassé",
    reparation: new GarageServicesModel().getServicesModel()
  }
];
