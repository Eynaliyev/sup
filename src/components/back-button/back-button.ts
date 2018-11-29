import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'back-button',
  templateUrl: 'back-button.html'
})
export class BackButtonComponent {
    constructor(
        private navCtrl: NavController
    ){}
    back() {
      this.navCtrl.pop();
    }
}
