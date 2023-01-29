export class GarageServicesModel {
  private select: any;
  private service: any;
  private piece: any;
  private groupe: any;

  constructor() {
    this.select = {
      service: {
        revision: { title: "Révision", tasks: [] },
        entretien: { title: "Entretien", tasks: [] },
        reparation: { title: "Réparation", tasks: [] }
      },
      piece: { title: "piece", tasks: [] },
    };
  }

  getServicesModel(): any {
    return this.select;
  }
}
