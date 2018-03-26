import { Component } from "@angular/core";
import {
	IonicPage,
	NavController,
	NavParams,
	Slides,
	MenuController,
	Platform
} from "ionic-angular";
import { ViewChild } from "@angular/core";
import { Device } from "@ionic-native/device";

@IonicPage()
@Component({
	selector: "page-intro",
	templateUrl: "intro.html"
})
export class IntroPage {
	@ViewChild(Slides) slides: Slides;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private menuCtrl: MenuController,
		private device: Device,
		private platform: Platform
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

	private getSlidesPosition(): string {
		return document.getElementById("slides").offsetTop + "px";
	}
}
