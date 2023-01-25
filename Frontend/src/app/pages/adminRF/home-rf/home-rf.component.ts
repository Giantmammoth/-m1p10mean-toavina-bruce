import { Component } from '@angular/core';

@Component({
  selector: 'app-home-rf',
  templateUrl: './home-rf.component.html',
  styleUrls: ['./home-rf.component.css']
})
export class HomeRFComponent {
  /* navigation */
  navigation: any = [
    {
      label: "Payement",
      icon: "payments"
    },
    {
      label: "Employée",
      icon: "group"
    },
    {
      label: "Statistique",
      icon: "analytics"
    }
  ]
}
