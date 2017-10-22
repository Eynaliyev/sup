import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import firebase from 'firebase';

// pages
import { MyProfilePage } from '../pages/pages';
import { ContactsListPage } from '../pages/pages';
import { NotificationsListPage } from '../pages/pages';
import { VIPPage } from '../pages/pages';
import { MeetSomebodyPage } from '../pages/pages';
import { LoginPage } from '../pages/pages';
//import { SettingsPage } from '../pages/pages';
// providers
import { UserService } from '../services/services';
// models
import { User } from '../models/models';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = LoginPage;
  @ViewChild(Nav) nav: Nav;
  pages: any[];
  activePage: any;
  loader: any;
  user: User;

  myProfile = {
    component: MyProfilePage,
  };

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private loadingCtrl: LoadingController,
    private userSrvc: UserService,
    private storage: Storage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.presentLoading();
      this.userSrvc.getCurrentUser().subscribe((result) => {
        if(result){
          this.rootPage = MeetSomebodyPage;
        } else {
          this.rootPage = LoginPage;
          this.storage.set('introShown', true);
        }
        this.loader.dismiss();
      });
    });
    this.pages = [
      { title: 'Meet people Nearby', component: MeetSomebodyPage, icon: 'ios-locate-outline' },
      { title: 'Contacts', component: ContactsListPage, icon: 'ios-chatboxes-outline' },
      //{ title: 'Notifications', component: NotificationsListPage, icon: 'ios-notifications-outline' },
      { title: 'Edit Profile', component: MyProfilePage, icon: 'ios-contacts-outline' },
      /*
      { title: 'Settings', component: SettingsPage, icon: 'ios-settings-outline' }
      */
    ];
    this.userSrvc.getCurrentUser()
    .subscribe( user => {
      console.log('current user :', user);
      this.user = user;
    });
  }
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.activePage = page;
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Authenticating..."
    });
    this.loader.present();
  }
  viewVIP(){
    this.navCtrl.push(VIPPage);
  }
  logout(){
    //add actual logging out and localStorage clearing
    this.navCtrl.setRoot(LoginPage);
  }
  checkActive(page){
    return page == this.activePage;
  }
}
