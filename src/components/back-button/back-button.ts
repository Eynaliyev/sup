import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ChatBubble component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'back-button',
  templateUrl: 'back-button.html'
})
export class BackButtonComponent {
    constructor(    
        public navCtrl: NavController
    ){}
    back() {
      this.navCtrl.pop();
    }
}
