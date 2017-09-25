import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {
  }
  
  logout(){
    //add actual logging out and localStorage clearing
    this.navCtrl.setRoot(LoginPage);
  }
}
