import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PurchasePage } from '../purchase/purchase';
import {VipService} from '../../services/services';
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
    public vipSrvc: VipService ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VIPPage');
  }
  watchAd(){
    this.vipSrvc.presentAd();
  }
  invite(){
    this.vipSrvc.inviteFriend();
    //this.facebook.appInvite({applink, photoUrl});
  }
  viewPurchasePage(){
    this.navCtrl.push(PurchasePage);
  }
}
