import { Component } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';
import {WaitlistPage} from '../pages';
import {Language} from '../../models/models';
import {User} from '../../models/models';
import { ChatroomService} from '../../services/services';
import { UserService} from '../../services/services';
@Component({
  selector: 'page-meet-somebody',
  templateUrl: 'meet-somebody.html'
})
export class MeetSomebodyPage {
  languages: Language[];
	selectedLanguages: Language[] = [];
	currentUser: User;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public chatroomSrvc: ChatroomService,
    public userSrvc: UserService,
    public app: App) {
      this.chatroomSrvc.getAvailableLanguages().subscribe(languages => {
        this.languages = languages;
        //console.log('possible languages loaded from the servie: ', this.languages);
			});
			this.userSrvc.getCurrentUser().subscribe(user => this.currentUser = user);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MeetSomebodyPage');
  }
  goToWaitlist(){
    // then, go to waitlist - perhaps waitlist should be a modal that can be dismissed as necessary?
    //console.log('selected languages being passed to waitlistPage: ', this.selectedLanguages);
    this.navCtrl.push(WaitlistPage, {location: this.currentUser.currentLocation, languages: this.selectedLanguages});
  }
  /*
  viewFilter(){
    this.navCtrl.push(FilterPage);
  }*/
}
