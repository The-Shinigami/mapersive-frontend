import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'interface';
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Insurance Form View',
        link: '/form',
        index: 0
      },
      {
        label: 'Table View',
        link: '/table',
        index: 1
      },
      {
        label: 'Grid View',
        link: '/card',
        index: 2
      }
    ];
  }

  

}
