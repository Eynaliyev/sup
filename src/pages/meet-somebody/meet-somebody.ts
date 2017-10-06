import { Component } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';
import {WaitlistPage} from '../pages';

@Component({
  selector: 'page-meet-somebody',
  templateUrl: 'meet-somebody.html'
})
export class MeetSomebodyPage {
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public app: App) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MeetSomebodyPage');
  }
  goToWaitlist(){
    this.navCtrl.push(WaitlistPage)
  }
}
