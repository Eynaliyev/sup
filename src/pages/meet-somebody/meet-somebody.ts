import { Component } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';
import {WaitlistPage} from '../pages';
import {FilterPage} from '../pages';

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
    // get location
    // then, go to waitlist - perhaps waitlist should be a modal that can be dismissed as necessary?
    this.navCtrl.push(WaitlistPage);
  }
  /*
  viewFilter(){
    this.navCtrl.push(FilterPage);
  }*/
}
