import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserProfilePage } from '../user-profile/user-profile';

import { User } from '../../models/user.model';

import { UserService } from '../../services/user.service';
import { USERS } from '../../services/mock-users';

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
    this.users = USERS;

  }

  goToUserProfile(params){
    this.navCtrl.push(UserProfilePage, params);
  }
}
