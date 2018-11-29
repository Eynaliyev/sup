import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {VipService} from '../../services/services';


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
