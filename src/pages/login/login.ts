import { PrelaunchPage } from "./../prelaunch/prelaunch";
import { WaitlistPage } from "./../waitlist/waitlist";
import { UserService } from "./../../services/user.service";
import { Component } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";
import { MeetSomebodyPage } from "../meet-somebody/meet-somebody";
import { AuthService } from "../../services/services";
import { UtilService } from "../../shared/util.service";
@Component({
	selector: "page-login",
	templateUrl: "login.html"
})
export class LoginPage {
	loader: any;
	constructor(
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public authSrvc: AuthService,
		public userSrvc: UserService,
		private utilSrvc: UtilService
	) {}
	ionViewDidLoad() {
		console.log("ionViewDidLoad LoginPage");
	}
	goToMeetSomebody() {
		this.navCtrl.setRoot(MeetSomebodyPage);
	}
	goToPrelaunchPage() {
		this.navCtrl.setRoot(PrelaunchPage);
	}
	facebookLogin(): void {
		var env = this;
		this.authSrvc.signInWithFacebook().then(
			authData => {
				this.loader
					.dismiss()
					.then(() => {
						this.userSrvc.setAccessToken(authData["credential"].accessToken);
						//should be after the user has been set
						this.userSrvc
							.setCurrentUser(authData["user"]["providerData"][0])
							.then(() => env.goToMeetSomebody())
							.catch(err => {
								console.log("Error:", err);
							});
					})
					.catch(err => {
						console.log("Error:", err);
					});
			},
			error =>
				this.loader
					.dismiss()
					.then(() => {
						console.error("login failed: ", error);
						this.utilSrvc.doAlert(error.message, {
							text: "Ok",
							role: "cancel"
						});
					})
					.catch(err => {
						console.log("Error:", err);
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
}
