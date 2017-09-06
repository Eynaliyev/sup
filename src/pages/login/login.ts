import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MeetSomebodyPage } from '../meet-somebody/meet-somebody';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }

  goToMeetSomebody(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MeetSomebodyPage);
  }
}
