import { Injectable } from '@angular/core';
import { Http} from '@angular/http';

@Injectable()
export class VipService {
	constructor(
    private http: Http
  ){}

    presentAd(){
          // https://ionicframework.com/docs/native/admob-free/

      // get an ad
      // when it finishes give VIP for 1 time?

    }
    inviteFriend(){
    // https://developers.facebook.com/docs/applinks/overview - app links overview
    // https://developers.facebook.com/docs/applinks/hosting-api - to hot a link to send in options
    // https://ionicframework.com/docs/native/facebook/ - the invite docs

      // get options for invites - messenger, what'sapp
      // open the invite method / dialog in the messenger
      //send invite?

    }
    buyVIP(option){
      // complete subscription
      // on success set the user's vip status to true and expiry to today's date plus whatever the number of months in the option


    }
}
