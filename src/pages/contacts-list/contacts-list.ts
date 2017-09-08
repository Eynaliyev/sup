import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserProfilePage } from '../user-profile/user-profile';

import { User } from '../../models/user.model';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'page-contacts-list',
  templateUrl: 'contacts-list.html'
})
export class ContactsListPage {

  private users: User[];
  constructor(public navCtrl: NavController) {
    console.log('ContactsListPage initialized');
  }

  ionViewWillEnter() {

  }

  goToUserProfile(params){
    this.navCtrl.push(UserProfilePage, params);
  }
}
