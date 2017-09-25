// imports
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

// declarations
import { MeetSomebodyPage } from '../pages/meet-somebody/meet-somebody';
import { ContactsListPage } from '../pages/contacts-list/contacts-list';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { ChatroomPage } from '../pages/chatroom/chatroom';
import {VIPPage} from '../pages/vip/vip';
import {PurchasePage} from '../pages/purchase/purchase';
import { GalleryComponent } from '../components/gallery/gallery';
import { ChatBubbleComponent } from '../components/chat-bubble/chat-bubble';
import { ProfilePostsComponent } from '../components/profile-posts/profile-posts';
import { ProfileTimelineComponent } from '../components/profile-timeline/profile-timeline';
import {FilterPage} from '../pages/filter/filter';
// providers
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {UserService} from '../services/user.service';

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
    FilterPage,
    PurchasePage,
    GalleryComponent,
    ChatBubbleComponent,
    ProfilePostsComponent,
    ProfileTimelineComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
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
    FilterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
