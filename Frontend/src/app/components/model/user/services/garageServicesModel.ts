export class GarageServicesModel{
    private select: any;
    service: any;
    piece: any;
    groupe: any;
  
    constructor(){
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
  
    getServicesModel(): any{
      return this.select;
    }
  }