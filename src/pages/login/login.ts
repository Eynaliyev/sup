import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MeetSomebodyPage } from '../meet-somebody/meet-somebody';
import { AuthService } from "../../services/services";
import { UtilService } from "../../shared/util.service";
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goToMeetSomebody(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MeetSomebodyPage);
  }/*
  facebookLogin(): void {
    this.authService.facebookLogin()
      .then( authData => {
        loading.dismiss().then( () => {
          this.goToHome();
      });
    }, error => {
      loading.dismiss().then( () => {
        this.utilService.doAlert(error.message, {
          text: "Ok",
          role: 'cancel'
        });
      });
    });
    let loading = this.loadingCtrl.create();
    loading.present();
  }*/
}
