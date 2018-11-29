import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'menu-button',
  templateUrl: 'menu-button.html'
})
export class MenuButtonComponent {
    constructor(    
        public navCtrl: NavController
    ){}
}
