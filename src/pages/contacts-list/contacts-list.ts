import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatroomPage } from '../pages';
import { UserService } from '../../services/services';
import {User} from '../../models/models';
import {Contact} from '../../models/models';
@Component({
  selector: 'page-contacts-list',
  templateUrl: 'contacts-list.html'
})
export class ContactsListPage {
  users : Contact[] = [];
  animateClass: any;
  currentUser: User;

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
        this.userService.getCurrentUser().subscribe(function(res){
        let contacts = res.contacts;
        for (let i = 0; i < contacts.length; i++) {
            setTimeout(function() {
                env.users.push(contacts[i]);
            }, 100 * i);
        }
        //console.log('contacts in contactsList: ', this.users);
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
  	this.navCtrl.push(ChatroomPage, {room: user.roomId})
  }
}
