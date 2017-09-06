import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-meet-somebody',
  templateUrl: 'meet-somebody.html'
})
export class MeetSomebodyPage {
  private languages;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController) {
  }

  presentLoadingText() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  }
}
