import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatroomPage } from '../pages';
import { RequestsListPage } from '../pages';
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
	newRequests: boolean = false;

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
			this.userService.getCurrentUser().subscribe(
				user => {
					this.currentUser = user;
					// setting contacts
					let contacts = user.contacts.sort((first, second) => {
						return second.lastMessage.date.getTime() - first.lastMessage.date.getTime();
					});
					for (let i = 0; i < contacts.length; i++) {
							setTimeout(function() {
									env.users.push(contacts[i]);
									console.log('contacts in contactsList: ', env.users);
							}, 100 * i);
					}
					// checking for new requests
					for(let i = 0; i < user.friendRequests.length; i++){
						if(user.friendRequests[i].seen.indexOf(this.currentUser.id) === -1){
							this.newRequests = true;
						}
					}
				},
				err => {
					console.error(err);
				}
			);
    });
  }
  doInfinite(infiniteScroll) {
   //Begin async operation
     this.ngAfterViewInit().then(()=>{
       infiniteScroll.complete();
      });
  }
  viewRequests(){
    this.navCtrl.push(RequestsListPage);
  }
  openChat(user){
  	this.navCtrl.push(ChatroomPage, {room: user.roomId})
  }
}
