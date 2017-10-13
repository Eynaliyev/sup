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
    let that = this;
    that.userData.getRandomUsers(6).subscribe(function(res){
        for (let i = 0; i < res.length; i++) {
            setTimeout(function() {
                that.participants.push(res[i]);
            }, 100 * i);
        }
    });
  }
  goToUser(id){
    this.navCtrl.push(UserProfilePage, {user: id});
  }
}
