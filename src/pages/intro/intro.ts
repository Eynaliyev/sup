import { Component } from "@angular/core";
import {
	IonicPage,
	NavController,
	NavParams,
	Slides,
	MenuController,
	LoadingController,
	Platform
} from "ionic-angular";
import { ViewChild } from "@angular/core";
import {
	UserService,
	AuthService,
	UtilService
} from "./../../services/services";
import { MeetSomebodyPage } from "../pages";
@IonicPage()
@Component({
	selector: "page-intro",
	templateUrl: "intro.html"
})
export class IntroPage {
	@ViewChild(Slides) slides: Slides;
	loader: any;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private menuCtrl: MenuController,
		private platform: Platform,
		public loadingCtrl: LoadingController,
		public utilService: UtilService,
		public authSrvc: AuthService,
		public userSrvc: UserService
	) {}

	ionViewDidLoad() {
		this.platform
			.ready()
			.then(() => {
				this.menuCtrl.enable(false);
			})
			.catch(() => {
				this.menuCtrl.enable(false);
			});
	}
	facebookLogin(): void {
		var env = this;
		this.authSrvc.signInWithFacebook().then(
			authData => {
				this.loader.dismiss().then(() => {
					this.userSrvc.setAccessToken(authData["credential"].accessToken);
					//should be after the user has been set
					this.userSrvc
						.setCurrentUser(authData["user"]["providerData"][0])
						.then(() => env.goToMeetSomebody());
				});
			},
			error =>
				this.loader.dismiss().then(() => {
					console.error("login failed: ", error);
					this.utilService.doAlert(error.message, {
						text: "Ok",
						role: "cancel"
					});
				})
		);
		this.presentLoading();
	}
	presentLoading() {
		this.loader = this.loadingCtrl.create({
			content: "Authenticating..."
		});
		this.loader.present();
	}
	goToMeetSomebody() {
		this.navCtrl.setRoot(MeetSomebodyPage);
	}
	private getSlidesPosition(): string {
		return document.getElementById("slides").offsetTop + "px";
	}
}
