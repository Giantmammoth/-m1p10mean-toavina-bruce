import { Component } from '@angular/core';
import { waitingItem } from './waitingItem';
@Component({
  selector: 'app-waiting-list-model',
  templateUrl: './waiting-list-model.component.html',
  styleUrls: ['./waiting-list-model.component.css']
})
export class WaitingListModelComponent {
  itemToShow?: waitingItem;
  showDetails(item: waitingItem) {
    this.itemToShow = item;
  }
}
