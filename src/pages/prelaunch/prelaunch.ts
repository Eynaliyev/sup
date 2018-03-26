import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the PrelaunchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-prelaunch",
	templateUrl: "prelaunch.html"
})
export class PrelaunchPage {
	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
		console.log("ionViewDidLoad PrelaunchPage");
	}
}
