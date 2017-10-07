import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ChatBubble component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'menu-button',
  templateUrl: 'menu-button.html'
})
export class MenuButtonComponent {
    constructor(    
        public navCtrl: NavController
    ){}
}
