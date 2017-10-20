// import services
import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
//import { Camera } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';
import { ChatroomService } from '../services/services';
import { UtilService } from '../shared/util.service';
import { VipService } from '../services/services';
import {UserService} from '../services/services';
import {AuthService} from '../services/services';
import {NotificationService} from '../services/services';
import {RequestService} from '../services/services';
// end import services

/*
class CameraMock extends Camera {
  getPicture(options){
    return new Promise( (resolve, reject) => {
      resolve(`TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=`);
    });
  }
}
*/

export class AppProviders {
    public static getProviders() {
        let providers;
        if(document.URL.includes('https://') || document.URL.includes('http://')){
          // Use browser providers
          providers = [
            UserService,
            NotificationService,
            //{provide: Camera, useClass: CameraMock},
            Facebook,
            AuthService,
            UtilService,
            StatusBar,
            SplashScreen,
            UserService,
            ChatroomService,
            VipService,
            UtilService,
            RequestService,
            Geolocation,
            {provide: ErrorHandler, useClass: IonicErrorHandler}
            /* import services */
          ];
        } else {
          // Use device providers
          providers = [
            UserService,
            NotificationService,
            //Camera,
            Facebook,
            AuthService,
            UtilService,
            StatusBar,
            SplashScreen,
            UserService,
            ChatroomService,
            VipService,
            UtilService,
            RequestService,
            Geolocation,
            {provide: ErrorHandler, useClass: IonicErrorHandler}
            /* import services */
          ];
        }
        return providers;
    }
}
