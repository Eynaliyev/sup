import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { MeetSomebodyPage } from '../meet-somebody/meet-somebody';
import { AuthService } from "../../services/services";
import { UtilService } from "../../shared/util.service";
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public utilService: UtilService,
    public authService: AuthService

  ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goToMeetSomebody(){
    this.navCtrl.setRoot(MeetSomebodyPage);
	}
  facebookLogin(): void {
    var env = this;
    this.authService.signInWithFacebook()
      .then( authData => {
        loading.dismiss().then( () => {
					console.log('login successful: ', JSON.stringify(authData));
          env.goToMeetSomebody();
      });
    }, error =>
      loading.dismiss().then( () => {
        this.utilService.doAlert(error.message, {
          text: "Ok",
          role: 'cancel'
        });
      })
    );
    let loading = this.loadingCtrl.create();
    loading.present();
  }
}
