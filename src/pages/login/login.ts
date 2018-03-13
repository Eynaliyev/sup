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
	constructor(
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public utilService: UtilService,
		public authSrvc: AuthService,
		public userSrvc: UserService
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
				loading.dismiss().then(() => {
					console.log(
						"login successful: ",
						JSON.stringify(authData["user"]["providerData"][0]["uid"])
					);
					this.userSrvc.setCurrentUser(
						authData["user"]["providerData"][0]["uid"]
					);
					//env.goToMeetSomebody(); - stop this for pre-launch
					env.goToMeetSomebody();
				});
			},
			error =>
				loading.dismiss().then(() => {
					this.utilService.doAlert(error.message, {
						text: "Ok",
						role: "cancel"
					});
				})
		);
		let loading = this.loadingCtrl.create();
		loading.present();
	}
}
