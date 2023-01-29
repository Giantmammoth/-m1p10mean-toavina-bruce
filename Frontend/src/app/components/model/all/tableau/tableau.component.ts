import { Component, Input, OnChanges } from '@angular/core';
import { RfService } from 'src/app/services/rfService/rf.service';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css', './tableau.component.scss']
})
export class TableauComponent {
  Data: any = []
  headerColumn?: string[];
  filterSelected: string = "id";
  filter?: string;
  dataToShow?: any;
  selectedCar: any;
  open: boolean = false;

  constructor(private dataServices: RfService) {

  }

  ngOnInit(): void {
    this.dataServices.reloadData().subscribe((data: any) => {
      console.log(data)
    })
    this.dataServices.getData().subscribe((data: any) => {
      this.Data = data;
      this.dataToShow = this.Data;
      console.log(this.dataToShow)
    })

    this.dataServices.reloadData().subscribe((data: any) => {

      let isIn = this.Data.some((car: any) => car._id == data._id);
      if (!isIn) {
        this.Data = this.Data.concat(data);
        this.dataToShow = this.Data;
      }
    })

    this.headerColumn = ["model", "matricule"];
    this.filterSelected = this.headerColumn[0];

  }

  searhInputType() {
    /*  if (typeof (this.Data[0][this.filterSelected]) === "string") {
       return "text";
     }
     return "number"; */
  }

  filterData(): void {
    let regex = new RegExp(`${this.filter}`, 'i');

    this.dataToShow = this.filter === "" ?
      this.Data
      :
      this.Data.filter((value: any) => {
        return typeof (value[this.filterSelected]) === "string" ?
          value[this.filterSelected].search(regex) !== -1
          :
          value[this.filterSelected] == this.filter;
      });
  }

  confirm() {
    this.dataToShow = this.dataToShow.filter((value: any) => value !== this.selectedCar)
    if (this.dataToShow.length !== 0) {
      this.selectedCar = this.dataToShow[0];
    } else {
      this.open = false
    }
    this.selectedCar.status = "payé"
    this.dataServices.confirm(this.selectedCar);
  }
}
