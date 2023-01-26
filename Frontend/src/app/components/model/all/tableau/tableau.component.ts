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

  constructor(private dataServices: RfService) { }

  ngOnInit(): void {
    this.dataServices.getData().subscribe(data => this.Data = data);
    this.headerColumn = Object.keys(this.Data[0]);
    this.filterSelected = this.headerColumn[0];
    this.dataToShow = this.Data;
  }

  searhInputType(): string {
    if (typeof (this.Data[0][this.filterSelected]) === "string") {
      return "text";
    }
    return "number";
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
}
