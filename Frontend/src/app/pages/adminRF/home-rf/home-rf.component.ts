import { Component } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private rfService: RfService, private router: Router) { }

  ngOnInit() { }

  logout() {
    localStorage.removeItem("x-auth-token");
    this.router.navigate(['/']);
  }

}
