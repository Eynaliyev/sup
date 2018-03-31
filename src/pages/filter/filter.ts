import { AuthService } from "./../../services/auth.service";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

/**
 * Generated class for the FilterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
	selector: "page-filter",
	templateUrl: "filter.html"
})
export class FilterPage {
	option = "friends";
	withoption = "girl";
	languages: any[];
	dualValue2 = { lower: 18, upper: 30 };
	constructor(private navCtrl: NavController, private authSrvc: AuthService) {}
	/*
	ionViewCanEnter() {
		return this.authSrvc.isLoggedIn();
	}*/
	ionViewDidLoad() {
		console.log("ionViewDidLoad FilterPage");
	}
	saveFilter() {
		this.navCtrl.pop();
	}

	change(d) {
		// 	console.log(d);
	}
}
