import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserProfilePage } from '../pages';
import { ChatroomPage } from '../pages';

import { UserService } from '../../services/user.service';

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
