import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {VipService} from '../../services/services';

/**
 * Generated class for the PurchasePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html',
})
export class PurchasePage {
	selected;
  constructor(
    private navCtrl: NavController,
		private navParams: NavParams,
		private authSrvc: AuthService,
    private vipSrvc: VipService
  ) { }
  /*
	ionViewCanEnter() {
		return this.authSrvc.isLoggedIn();
	}*/
  select(btn){
  	this.selected = btn;
    console.log(btn);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchaseVipPage');
  }
  buyVIP(){
    console.log(this.selected);
    this.vipSrvc.buyVIP(this.selected);
  }
  back() {
    this.navCtrl.pop();
  }
}
