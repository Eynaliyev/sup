import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserProfilePage } from '../user-profile/user-profile';
import { ChatroomPage } from '../../pages/chatroom/chatroom';

import { User } from '../../models/user.model';

import { UserService } from '../../services/user.service';
import { USERS } from '../../services/mock-users';

@Component({
  selector: 'page-contacts-list',
  templateUrl: 'contacts-list.html'
})
export class ContactsListPage {

  users = [];
  animateClass: any;

  constructor(
    public navCtrl: NavController,
    private userService: UserService
  ) {
    console.log('ContactsListPage initialized');
    this.animateClass = { 'zoom-in': true };
    
  }

  ionViewWillEnter() {
    this.users = USERS;

  }
  ngAfterViewInit() {  
    return new Promise(resolve => {
        let env = this;
        this.userService.getRandomUsers(8).subscribe(function(res){
        for (let i = 0; i < res.length; i++) {
            setTimeout(function() {
                env.users.push(res[i]);
            }, 100 * i);
        }
        resolve(true);
      });
    });
    }


  doInfinite(infiniteScroll) {
   //Begin async operation

     this.ngAfterViewInit().then(()=>{
       infiniteScroll.complete();
     });
  }

  openChat(user){
  	this.navCtrl.push(ChatroomPage, {user: user})
  }
}
