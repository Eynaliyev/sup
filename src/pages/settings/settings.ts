import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../pages';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  languages: any[];
  constructor(
		public navCtrl: NavController,
		private authService: AuthService) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  logout(){
    //add actual logging out and localStorage clearing
    this.authService.logout().then((res) => this.navCtrl.setRoot(LoginPage));
  }
}
