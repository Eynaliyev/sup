import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PurchasePage } from '../purchase/purchase';

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
    public navCtrl: NavController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VIPPage');
  }
  watchAd(){
    // https://ionicframework.com/docs/native/admob-free/
  }
  invite(){
    // https://developers.facebook.com/docs/applinks/overview - app links overview
    // https://developers.facebook.com/docs/applinks/hosting-api - to hot a link to send in options
    // https://ionicframework.com/docs/native/facebook/ - the invite docs

    //this.facebook.appInvite({applink, photoUrl});
  }
  viewPurchasePage(){
    this.navCtrl.push(PurchasePage);
  }
}
