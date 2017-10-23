import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PurchasePage } from '../purchase/purchase';
import {VipService} from '../../services/services';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the VIP page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vip',
  templateUrl: 'vip.html',
})
export class VIPPage {
  constructor(
    public navCtrl: NavController,
		public vipSrvc: VipService,
		private alertCtrl: AlertController
	 ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VIPPage');
  }
  watchAd(){
		this.presentAlert();
    //this.vipSrvc.presentAd();
  }
  invite(){
		this.presentAlert();
    //this.vipSrvc.inviteFriend();
    //this.facebook.appInvite({applink, photoUrl});
  }
  viewPurchasePage(){
		this.presentAlert();
    //this.navCtrl.push(PurchasePage);
	}
	presentAlert(){
		const alert = this.alertCtrl.create({
			title: 'Sorry',
			message: "This function is not available at this time",
			buttons: [
				{
					text: 'Got it',
					role: 'cancel',
					handler: () => {
						console.log('Got it clicked');
					}
				}
			]
		});
		alert.present();
	}
}
