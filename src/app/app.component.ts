import { Component, ViewChild, NgZone } from "@angular/core";
import { Platform, MenuController, Nav } from "ionic-angular";
import { Storage } from "@ionic/storage";
// pages
// import { NotificationsListPage } from "../pages/pages";
import {
	LoginPage,
	MeetSomebodyPage,
	VIPPage,
	ContactsListPage,
	MyProfilePage,
	TabsPage,
	IntroPage
} from "../pages/pages";
//import { SettingsPage } from '../pages/pages';
// providers
import {
	UserService,
	AuthService,
	FirestoreService
} from "../services/services";
// models
import { User } from "../models/models";

@Component({
	templateUrl: "app.component.html"
})
export class MyApp {
	@ViewChild(Nav) navCtrl: Nav;
	private rootPage: any;
	pages: Array<{ title: string; component: any; icon: string }>;
	public currentUser: User;

	constructor(
		private platform: Platform,
		private menu: MenuController,
		private authSrvc: AuthService,
		private firestore: FirestoreService,
		//private splashScreen: SplashScreen,
		private storage: Storage,
		//private auth: AuthProvider,
		//private firestore: FirestoreProvider,
		private zone: NgZone,
		private userSrvc: UserService
	) {
		this.initializeApp();
	}
	initializeApp() {
		this.platform
			.ready()
			.then(() => {
				// Okay, so the platform is ready and our plugins are available.
				// Here you can do any higher level native things you might need.
				this.rootPage = "LoaderPage";
			})
			.catch(() => (this.rootPage = "LoaderPage"));
	}
	ngOnInit() {
		/*
		this.authSrvc.getUserData().then(
			result => {
				//getCurrentUser returns a subject so we need to check if there's actual value in it
				if (result) {
					this.currentUser = result;
					console.log("current user :", this.currentUser);
					this.rootPage = MeetSomebodyPage;
				} else {
					this.rootPage = LoginPage;
					//this.storage.set('introShown', true);
				}
			},
			err => {
				console.error(err);
				//this.loader.dismiss();
			}
		);*/
	}
	loadPage() {}

	openPage(page) {
		// navigate to the new page if it is not the current page
		this.navCtrl.setRoot(page.component);
	}
	viewVIP() {
		this.navCtrl.push(VIPPage);
	}
	logout() {
		//add actual logging out and locaStorage clearing
		this.authSrvc
			.logout()
			.then(res => this.navCtrl.setRoot(LoginPage))
			.catch(err => console.log(err));
	}
}
