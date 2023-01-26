export class GarageServicesModel {
  private select: any;
  private service: any;
  private piece: any;
  private groupe: any;

  constructor() {
    this.select = {
      service: {
        title: "service",
        revision: { title: "Révision", tasks: [] },
        entretien: { title: "Entretien", tasks: [] },
        reparation: { title: "Réparation", tasks: [] }
      },
      piece: { title: "piece", tasks: [] },
      groupe: { title: "groupe", agent: [] }
    };
  }

  getServicesModel(): any {
    return this.select;
  }
}
