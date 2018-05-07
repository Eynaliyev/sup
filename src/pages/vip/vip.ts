import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { PurchasePage } from "../purchase/purchase";
import { VipService } from "../../services/services";
import { UtilService } from "../../shared/util.service";
import { AlertController } from "ionic-angular";

/**
 * Generated class for the VIP page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
	selector: "page-vip",
	templateUrl: "vip.html"
})
export class VIPPage {
	constructor(
		public navCtrl: NavController,
		public vipSrvc: VipService,
		private alertCtrl: AlertController,
		private utilSrvc: UtilService
	) {}

	ionViewDidLoad() {
		console.log("ionViewDidLoad VIPPage");
	}
	watchAd() {
		this.utilSrvc.presentFakedoorAlert("watchAd");
		//this.vipSrvc.presentAd();
	}
	invite() {
		this.utilSrvc.presentFakedoorAlert("invite");
		//this.vipSrvc.inviteFriend();
		//this.facebook.appInvite({applink, photoUrl});
	}
	viewPurchasePage() {
		this.utilSrvc.presentFakedoorAlert("viewPurchasePage");
		//this.navCtrl.push(PurchasePage);
	}
}
