import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import {VIPPage} from '../vip/vip';
/**
 * Generated class for the WaitlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-waitlist',
  templateUrl: 'waitlist.html',
})
export class WaitlistPage {

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
    public app: App) {
  }
  private numberInFront: number = 5;
  private numberBehind: number = 15;

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaitlistPage');
  }
  viewVIP(){
    this.navCtrl.push(VIPPage);
  }
}
