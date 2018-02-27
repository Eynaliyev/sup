// imports
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
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
import {VIPPage} from '../pages/pages';
import {PurchasePage} from '../pages/pages';
import {WaitlistPage} from '../pages/pages';
import {ParticipantsListPage} from '../pages/pages';
import {NotificationsListPage} from '../pages/pages';
import {RequestsListPage} from '../pages/pages';
// components
import { GalleryComponent } from '../components/components';
import { ChatBubbleComponent } from '../components/components';
import { ProfilePostsComponent } from '../components/components';
import { ProfileTimelineComponent } from '../components/components';
import { BackButtonComponent } from '../components/components';
import { MenuButtonComponent } from '../components/components';
import firebase from 'firebase';
// providers
import { DefaultImageDirective } from '../shared/default-image.directive';
import { PipeModule } from '../shared/pipe.module';
import { AppProviders } from './app.providers';

export const firebaseConfig = {
	apiKey: "AIzaSyDI22hmtv2clf3WYdo2y04z_h-eCfbv_F4",
	authDomain: "huggable-9e981.firebaseapp.com",
	databaseURL: "https://huggable-9e981.firebaseio.com",
	projectId: "huggable-9e981",
	storageBucket: "huggable-9e981.appspot.com",
	messagingSenderId: "272489685620"
};


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
    WaitlistPage,
    GalleryComponent,
    ChatBubbleComponent,
    ProfilePostsComponent,
    ProfileTimelineComponent,
    BackButtonComponent,
    MenuButtonComponent,
    ParticipantsListPage,
    NotificationsListPage,
    RequestsListPage,
    DefaultImageDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    PipeModule.forRoot(),
		IonicModule.forRoot(MyApp),
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireDatabaseModule,
		AngularFirestoreModule.enablePersistence(),
		AngularFireAuthModule,
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
    ParticipantsListPage,
    NotificationsListPage,
    RequestsListPage,
    WaitlistPage
	],
	providers: AppProviders.getProviders()
})
export class AppModule {}
