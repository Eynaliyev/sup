import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
      console.log(this.navParams.data);
      let id = this.navParams.data.get('id');
      let name = this.navParams.data.get('name');
  }

}
