import { Component } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';
import {UserProfilePage} from '../user-profile/user-profile';
import {FilterPage} from '../filter/filter';
import {VIPPage} from '../vip/vip';
@Component({
  selector: 'page-meet-somebody',
  templateUrl: 'meet-somebody.html'
})
export class MeetSomebodyPage {
  private languages;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public app: App) {
  }

  private numberInFront: number = 5;
  private numberBehind: number = 15;

  viewVIP(){
    this.navCtrl.push(VIPPage);
  }
  // view user
  viewUser(id) {
    this.app.getRootNav().push(UserProfilePage, {id: id});
  }
  // view notifications
  viewFilter() {
    this.app.getRootNav().push(FilterPage);
  }
  closeWaitlist(){
    this.app.getRootNav().pop();
  }
}
