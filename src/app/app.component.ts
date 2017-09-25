import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyProfilePage } from '../pages/my-profile/my-profile';
import { ContactsListPage } from '../pages/contacts-list/contacts-list';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { FaqPage } from '../pages/faq/faq';
import { SettingsPage } from '../pages/settings/settings';
import { MeetSomebodyPage } from '../pages/meet-somebody/meet-somebody';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = MeetSomebodyPage;
  @ViewChild(Nav) nav: Nav;
  pages: any[];
  activePage: any;

  constructor(
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen, 
    private platform: Platform, 
    private menu: MenuController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      { title: 'Meet people Nearby', component: MeetSomebodyPage, icon: 'ios-locate-outline' },
      { title: 'Edit Profile', component: MyProfilePage, icon: 'ios-contacts-outline' },
      { title: 'Contacts', component: ContactsListPage, icon: 'ios-chatboxes-outline' },
      { title: 'FAQ', component: FaqPage, icon: 'ios-flash-outline' },
      { title: 'Settings', component: SettingsPage, icon: 'ios-settings-outline' }
    ];
  }
  
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.activePage = page;
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  checkActive(page){
    return page == this.activePage;
  }
}
