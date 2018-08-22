import { Component, ViewChild } from "@angular/core";
import { Platform, MenuController, Nav } from "ionic-angular";
//import { Storage } from '@ionic/storage';
// pages
import { MyProfilePage } from "../pages/pages";
import { ContactsListPage } from "../pages/pages";
// import { NotificationsListPage } from "../pages/pages";
import { VIPPage } from "../pages/pages";
import { MeetSomebodyPage } from "../pages/pages";
import { LoginPage } from "../pages/pages";
//import { SettingsPage } from '../pages/pages';
// providers
import { UserService } from "../services/services";
import { AuthService } from "../services/services";
// models
import { User } from "../models/models";

@Component({
	templateUrl: "app.component.html"
})
export class MyApp {
	@ViewChild(Nav)
	navCtrl: Nav;
	public rootPage: any = LoginPage;
	@ViewChild(Nav)
	nav: Nav;
	public pages: any[] = [];
	private activePage: any;
	public currentUser: User;

	myProfile = {
		component: MyProfilePage
	};

	constructor(
		private platform: Platform,
		private menu: MenuController,
		private authSrvc: AuthService,
		//private storage: Storage,
		private userSrvc: UserService
	) {
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
		platform
			.ready()
			.then(() => {
				// Okay, so the platform is ready and our plugins are available.
				// Here you can do any higher level native things you might need.
			})
			.catch(err => {
				console.log("Error:", err);
			});
	}
	ngOnInit() {
		this.userSrvc
			.getCurrentUser()
			.take(2)
			.subscribe(
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
	openPage(page) {
		// close the menu when clicking a link from the menu
		this.menu.close();
		this.activePage = page;
		// navigate to the new page if it is not the current page
		this.nav.setRoot(page.component);
	}
	viewVIP() {
		this.navCtrl.push(VIPPage);
	}
	logout() {
		//add actual logging out and locaStorage clearing
		this.authSrvc
			.logout()
			.then(() => this.navCtrl.setRoot(LoginPage))
			.catch(err => {
				console.log("Error:", err);
			});
	}
	checkActive(page) {
		return page == this.activePage;
	}
}
