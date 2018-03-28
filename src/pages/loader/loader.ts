import { Component, ViewChild, NgZone } from "@angular/core";
import {
	IonicPage,
	MenuController,
	NavController,
	NavParams,
	Platform
} from "ionic-angular";
import {
	LoginPage,
	MeetSomebodyPage,
	VIPPage,
	ContactsListPage,
	MyProfilePage,
	TabsPage,
	IntroPage
} from "../pages";
//import { SettingsPage } from '../pages/pages';
// providers
import {
	UserService,
	AuthService,
	FirestoreService
} from "../../services/services";
// models
import { User } from "../../models/models";
/**
 * Generated class for the LoaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-loader",
	templateUrl: "loader.html"
})
export class LoaderPage {
	constructor(
		private platform: Platform,
		private menu: MenuController,
		private authSrvc: AuthService,
		private firestore: FirestoreService,
		public navCtrl: NavController,
		//private splashScreen: SplashScreen,
		private storage: Storage,
		//private auth: AuthProvider,
		//private firestore: FirestoreProvider,
		private zone: NgZone,
		private userSrvc: UserService
	) {}

	ionViewDidLoad() {
		console.log("ionViewDidLoad LoaderPage");
	}
	ionViewWillEnter() {
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
								this.navCtrl.setRoot(LoginPage);
								//this.splashScreen.hide();
							} else {
								// Check if userData is already created on Firestore.
								this.firestore
									.exists("users/" + user.uid)
									.then(exists => {
										// No data yet, proceed to CreateProfilePage.
										if (!exists) {
											this.navCtrl.setRoot(LoginPage);

											//this.splashScreen.hide();
										} else {
											// Data exists, proceed to TabsPage.
											this.navCtrl.setRoot(TabsPage);

											//this.splashScreen.hide();
										}
									})
									.catch(err => console.log(err));
							}
						})
						.catch(err => console.log(err));
				} else {
					// User is loading the app for the very first time, show IntroPage.
					this.navCtrl.setRoot("IntroPage");
					//this.splashScreen.hide();
					this.storage.set("introShown", true);
				}
			})
			.catch(err => console.log(err));
	}
}
