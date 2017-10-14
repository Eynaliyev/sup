import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserProfilePage} from '../pages';
import { UserService } from '../../services/services';

@Component({
  selector: 'page-participants-list',
  templateUrl: 'participants-list.html',
  providers: [UserService]
})
export class ParticipantsListPage {
  participants = [];
  animateClass: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userData: UserService) {
  	this.animateClass = { 'zoom-in': true };
  }
  ngAfterViewInit() {
    //this.navParams.data - get users from navparams instead of loading from backend
    let users = this.navParams.get('participants');
    for (let i = 0; i < users.length; i++) {
        setTimeout(function() {
            this.participants.push(users[i]);
        }, 100 * i);
    }
  }
  goToUser(id){
    this.navCtrl.push(UserProfilePage, {user: id});
  }
}
