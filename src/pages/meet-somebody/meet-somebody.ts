import { LANGUAGES } from './../../services/languages-list';
import { Component } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';
import {WaitlistPage} from '../pages';
import {Language} from '../../models/models';
import {User} from '../../models/models';
import { ChatroomService} from '../../services/services';
import { UserService} from '../../services/services';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-meet-somebody',
  templateUrl: 'meet-somebody.html'
})
export class MeetSomebodyPage {
  languages: Language[];
	selectedLanguages: Language[] = [];
	currentUser: User;
	currentLocation: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public chatroomSrvc: ChatroomService,
		public userSrvc: UserService,
		public geolocation: Geolocation,
    public app: App) {
      this.languages = LANGUAGES;
			this.userSrvc.getCurrentUser().take(2).subscribe(user => this.currentUser = user);
			this.geolocation.getCurrentPosition().then(location => {
				this.currentLocation = location;
				console.log("user's locations: ", location);
			}).catch(err => {
				console.log('Error:', err);
			});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MeetSomebodyPage');
  }
  goToWaitlist(){
    // then, go to waitlist - perhaps waitlist should be a modal that can be dismissed as necessary?
    //console.log('selected languages being passed to waitlistPage: ', this.selectedLanguages);
    this.navCtrl.push(WaitlistPage, {location: this.currentLocation, languages: this.selectedLanguages});
  }
  /*
  viewFilter(){
    this.navCtrl.push(FilterPage);
  }*/
}
