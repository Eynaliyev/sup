import { Component } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';
import {UserProfilePage} from '../user-profile/user-profile';
import {FilterPage} from '../filter/filter';
import {WaitlistPage} from '../waitlist/waitlist';
@Component({
  selector: 'page-meet-somebody',
  templateUrl: 'meet-somebody.html'
})
export class MeetSomebodyPage {
  private languages;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public app: App) {
  }
  findRandomChat(){
    //search for chatroom
    // while searching open waitlist modal
    this.openWaitlist();
    // this.roomService.findRoom()
    // .then(room => {
    //   this.room = room;
    //   this.closeWaitlist();
    // })
    //when found a room close the modal
  }
  // view user
  viewUser(id) {
    this.app.getRootNav().push(UserProfilePage, {id: id});
  }
  // view notifications
  viewSettings() {
    this.app.getRootNav().push(FilterPage);
  }
  openWaitlist() {
    this.app.getRootNav().push(WaitlistPage);
  }
  closeWaitlist(){
    this.app.getRootNav().pop();
  }
}
