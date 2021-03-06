// imports
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule } from "ionic-angular";
import { MyApp } from "./app.component";
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from "@ionic/storage";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
// declarations
// pages
import { MeetSomebodyPage } from "../pages/pages";
import { ContactsListPage } from "../pages/pages";
import { SettingsPage } from "../pages/pages";
import { LoginPage } from "../pages/pages";
import { UserProfilePage } from "../pages/pages";
import { MyProfilePage } from "../pages/pages";
import { ChatroomPage } from "../pages/pages";
import { FilterPage } from "../pages/pages";
import { VIPPage } from "../pages/pages";
import { PurchasePage } from "../pages/pages";
import { WaitlistPage } from "../pages/pages";
import { ParticipantsListPage } from "../pages/pages";
import { NotificationsListPage } from "../pages/pages";
import { RequestsListPage } from "../pages/pages";
// components
import { GalleryComponent } from "../components/components";
import { ChatBubbleComponent } from "../components/components";
import { ProfilePostsComponent } from "../components/components";
import { ProfileTimelineComponent } from "../components/components";
import { BackButtonComponent } from "../components/components";
import { MenuButtonComponent } from "../components/components";
import firebase from "firebase";
// providers
import { DefaultImageDirective } from "../shared/default-image.directive";
import { PipeModule } from "../shared/pipe.module";
// import services
import { ErrorHandler } from "@angular/core";
import { IonicErrorHandler } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { UtilService } from "./../shared/util.service";
//import { Camera } from '@ionic-native/camera';
import { Facebook } from "@ionic-native/facebook";
import { ChatroomService } from "../services/services";
import { VipService } from "../services/services";
import { UserService } from "../services/services";
import { AuthService } from "../services/services";
import { NotificationService } from "../services/services";
import { RequestService } from "../services/services";
import { ContactService } from "../services/services";
import { AngularFireDatabase } from "angularfire2/database";
import { AlertService } from "../services/services";
import { FirestoreService } from "../services/services";
import { Environment } from "../environment/environment";

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
		IonicModule.forRoot(MyApp, Environment.config),
		AngularFireModule.initializeApp(Environment.firebase),
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
	providers: [
		UserService,
		NotificationService,
		//Camera,
		Facebook,
		AuthService,
		ContactService,
		UserService,
		ChatroomService,
		AngularFireDatabase,
		VipService,
		RequestService,
		Geolocation,
		AlertService,
		FirestoreService,
		UtilService,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule {}
