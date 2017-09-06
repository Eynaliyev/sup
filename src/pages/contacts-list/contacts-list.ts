import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProfilePage } from '../user-profile/user-profile';

@Component({
  selector: 'page-contacts-list',
  templateUrl: 'contacts-list.html'
})
export class ContactsListPage {

  constructor(public navCtrl: NavController) {
  }
  goToUserProfile(params){
    if (!params) params = {};
    this.navCtrl.push(UserProfilePage);
  }
}
