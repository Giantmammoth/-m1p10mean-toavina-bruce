import { Component } from '@angular/core';
import { RfService } from 'src/app/services/rfService/rf.service';

@Component({
  selector: 'app-home-rf',
  templateUrl: './home-rf.component.html',
  styleUrls: ['./home-rf.component.css']
})
export class HomeRFComponent {
  Data: any;
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


  constructor(private rfService: RfService) { }

  ngOnInit() { }


}
