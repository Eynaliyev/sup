import { Component, ViewChild, NgZone } from "@angular/core";
import {
	Platform,
	MenuController,
	NavController,
	NavParams
} from "ionic-angular";
import { Storage } from "@ionic/storage";
// pages
// import { NotificationsListPage } from "../pages/pages";
import {
	LoginPage,
	MeetSomebodyPage,
	VIPPage,
	ContactsListPage,
	MyProfilePage
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
	private rootPage: any = LoginPage;
	pages: Array<{ title: string; component: any; icon: string }>;
	private activePage: any;
	public currentUser: User;

	myProfile = {
		component: MyProfilePage
	};

	constructor(
		private platform: Platform,
		private menu: MenuController,
		private authSrvc: AuthService,
		private navCtrl: NavController,
		private navParams: NavParams,
		private firestore: FirestoreService,
		//private splashScreen: SplashScreen,
		private storage: Storage,
		//private auth: AuthProvider,
		//private firestore: FirestoreProvider,
		private zone: NgZone,
		private userSrvc: UserService
	) {
		this.initializeApp();
		this.pages = [
			{
				title: "Meet people Nearby",
				component: MeetSomebodyPage,
				icon: "ios-locate-outline"
			},
			{
				title: "Contacts",
				component: ContactsListPage,
				icon: "ios-chatboxes-outline"
			},
			//{ title: 'Notifications', component: NotificationsListPage, icon: 'ios-notifications-outline' },
			{
				title: "Edit Profile",
				component: MyProfilePage,
				icon: "ios-contacts-outline"
			}
			/*
      { title: 'Settings', component: SettingsPage, icon: 'ios-settings-outline' }
      */
		];
	}
	initializeApp() {
		this.platform
			.ready()
			.then(() => {
				// Okay, so the platform is ready and our plugins are available.
				// Here you can do any higher level native things you might need.
				this.loadPage();
			})
			.catch(() => this.loadPage());
	}
	ngOnInit() {
		this.userSrvc.getCurrentUser().subscribe(
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
		);
	}
	loadPage() {
		// Show the splashScreen while the page to show to the user is still loading.
		//this.splashScreen.show();
		this.storage
			.get("introShown")
			.then((introShown: boolean) => {
				// Check if user is loading the app for the very first time and show the IntroPage.
				if (introShown) {
					// Check if user is authenticated on Firebase or not.
					this.authSrvc
						.getUser()
						.then((user: firebase.User) => {
							if (!user) {
								// User is not authenticated, proceed to LoginPage.
								this.navCtrl.setRoot("LoginPage");
								//this.splashScreen.hide();
							} else {
								// Check if userData is already created on Firestore.
								this.firestore
									.exists("users/" + user.uid)
									.then(exists => {
										// No data yet, proceed to CreateProfilePage.
										if (!exists) {
											this.navCtrl.setRoot("CreateProfilePage");
											//this.splashScreen.hide();
										} else {
											// Data exists, proceed to TabsPage.
											this.zone.run(() => {
												this.navCtrl.setRoot("TabsPage");
											});
											//this.splashScreen.hide();
										}
									})
									.catch(() => {});
							}
						})
						.catch(() => {});
				} else {
					// User is loading the app for the very first time, show IntroPage.
					this.navCtrl.setRoot("IntroPage");
					//this.splashScreen.hide();
					this.storage.set("introShown", true);
				}
			})
			.catch(() => {});
	}

	openPage(page) {
		// close the menu when clicking a link from the menu
		this.menu.close();
		this.activePage = page;
		// navigate to the new page if it is not the current page
		this.navCtrl.setRoot(page.component);
	}
	viewVIP() {
		this.navCtrl.push(VIPPage);
	}
	logout() {
		//add actual logging out and locaStorage clearing
		this.authSrvc.logout().then(res => this.navCtrl.setRoot(LoginPage));
	}
	checkActive(page) {
		return page == this.activePage;
	}
}
