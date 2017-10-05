// imports
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

// declarations
// pages
import { MeetSomebodyPage } from '../pages/pages';
import { ContactsListPage } from '../pages/pages';
import { SettingsPage } from '../pages/pages';
import { LoginPage } from '../pages/pages';
import { UserProfilePage } from '../pages/pages';
import { MyProfilePage } from '../pages/pages';
import { ChatroomPage } from '../pages/pages';
import {FilterPage} from '../pages/pages';
import {FaqPage} from '../pages/pages';
import {VIPPage} from '../pages/pages';
import {PurchasePage} from '../pages/pages';
// components
import { GalleryComponent } from '../components/components';
import { ChatBubbleComponent } from '../components/components';
import { ProfilePostsComponent } from '../components/components';
import { ProfileTimelineComponent } from '../components/components';
import { BackButtonComponent } from '../components/components';
import { MenuButtonComponent } from '../components/components';

// providers
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {UserService} from '../services/services';
import {ChatroomService} from '../services/services';
import {MessageService} from '../services/services';

@NgModule({
  declarations: [
    MyApp,
    MeetSomebodyPage,
    ContactsListPage,
    SettingsPage,
    LoginPage,
    UserProfilePage,
    MyProfilePage,
    ChatroomPage,
    VIPPage,
    FaqPage,
    FilterPage,
    PurchasePage,
    GalleryComponent,
    ChatBubbleComponent,
    ProfilePostsComponent,
    ProfileTimelineComponent,
    BackButtonComponent,
    MenuButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MeetSomebodyPage,
    ContactsListPage,
    SettingsPage,
    LoginPage,
    UserProfilePage,
    MyProfilePage,
    ChatroomPage,
    VIPPage,
    PurchasePage,
    FilterPage,
    FaqPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    ChatroomService,
    MessageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
