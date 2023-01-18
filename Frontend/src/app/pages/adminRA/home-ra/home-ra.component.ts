import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home-ra',
  templateUrl: './home-ra.component.html',
  styleUrls: ['./home-ra.component.css'],
})
export class HomeRAComponent {
  enAttente = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  enCours = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  enSortie = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog',
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
