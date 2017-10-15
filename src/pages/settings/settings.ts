import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../pages';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  languages: any[];
  constructor(public navCtrl: NavController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
}
