import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyProfilePage } from '../pages/my-profile/my-profile';
import { ContactsListPage } from '../pages/contacts-list/contacts-list';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { LoginPage } from '../pages/login/login';


import { MeetSomebodyPage } from '../pages/meet-somebody/meet-somebody';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = MeetSomebodyPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToMeetSomebody(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MeetSomebodyPage);
  }
  goToMyProfile(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MyProfilePage);
  }
  goToContactsList(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ContactsListPage);
  }
  goToUserProfile(params){
    if (!params) params = {};
    this.navCtrl.setRoot(UserProfilePage);
  }
  goToLogin(params){
    if (!params) params = {};
    this.navCtrl.setRoot(LoginPage);
  }
}
