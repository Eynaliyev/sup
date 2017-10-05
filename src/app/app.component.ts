import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

import { MyProfilePage } from '../pages/pages';
import { ContactsListPage } from '../pages/pages';
import { UserProfilePage } from '../pages/pages';
import { FaqPage } from '../pages/pages';
import { SettingsPage } from '../pages/pages';
import { MeetSomebodyPage } from '../pages/pages';
import { LoginPage } from '../pages/pages';


@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = MeetSomebodyPage;
  @ViewChild(Nav) nav: Nav;
  pages: any[];
  activePage: any;
  loader: any;

  myProfile = { 
    title: 'Edit Profile', 
    component: MyProfilePage, 
    icon: 'ios-contacts-outline' 
  };
  
  
  constructor(
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen, 
    private platform: Platform, 
    private menu: MenuController,
    private loadingCtrl: LoadingController,
    private storage: Storage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.presentLoading();
      
      this.storage.get('introShown').then((result) => {
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
  
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Authenticating..."
    });
    this.loader.present();
  }

  checkActive(page){
    return page == this.activePage;
  }
}
