import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { PurchasePage } from "../purchase/purchase";
import { VipService } from "../../services/services";
import { UtilService } from "../../shared/util.service";
import { AlertController } from "ionic-angular";

@Component({
	selector: "page-vip",
	templateUrl: "vip.html"
})
export class VIPPage {
	purchaseSelected: boolean = false;

	constructor(
		public navCtrl: NavController,
		public vipSrvc: VipService,
		private alertCtrl: AlertController,
		private utilSrvc: UtilService
	) {}

	ionViewDidLoad() {
		console.log("ionViewDidLoad VIPPage");
	}
	select(option: string) {
		console.log("select clicked withthe option:", option);
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
