import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../services/services';
import { RequestService } from '../../services/services';
import {User} from '../../models/models';
import {Request} from '../../models/models';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-requests-list',
  templateUrl: 'requests-list.html'
})
export class RequestsListPage {
  requests : Request[] = [];
  animateClass: any;
  currentUser: User;
	likeAlertPresented: boolean = false;
	unlikeAlertPresented: boolean = false;
	blockAlertPresented: boolean = false;

  constructor(
    public navCtrl: NavController,
		private requestsSrvc: RequestService,
		private userSrvc: UserService,
    public alertCtrl: AlertController
  ) {
    console.log('RequestsListPage initialized');
    this.animateClass = { 'zoom-in': true };

  }
  ionViewWillEnter() {
  }
  ngAfterViewInit() {
    return new Promise(resolve => {
      let env = this;
      this.userSrvc.getCurrentUser().subscribe(user => {
        this.currentUser = user;
        this.requestsSrvc.getRequests(user.id).subscribe(requests => {
					console.log("requests from the service: ", requests);
          let res = requests.sort((first, second) => {
            return second.date.getTime() - first.date.getTime();
          });
          for (let i = 0; i < res.length; i++) {
            setTimeout(function() {
                env.requests.push(res[i]);
                console.log('requests in requestsList: ', env.requests);
            }, 100 * i);
          }
        });
      });
    });
  }
  doInfinite(infiniteScroll) {
   //Begin async operation
     this.ngAfterViewInit().then(()=>{
       infiniteScroll.complete();
      });
	}

  like(id: string) {
		if(!this.likeAlertPresented){
			// alert
			const alert = this.alertCtrl.create({
				title: 'Confirm Like',
				message: 'Do you want to add this person to contacts?',
				buttons: [
					{
						text: 'Cancel',
						role: 'cancel',
						handler: () => {
							console.log('Cancel clicked');
						}
					},
					{
						text: 'Like',
						handler: () => {
							console.log('Buy clicked');
							this.userSrvc.like(id);
						}
					}
				]
			});
			alert.present();
			this.likeAlertPresented = true;
		} else {
			this.userSrvc.like(id);
		}
	}
	block(id: string){
		if(!this.blockAlertPresented){
			const alert = this.alertCtrl.create({
				title: 'Confirm Like',
				message: "Do you want to block this contact? You won't be placed in the same room with them again.",
				buttons: [
					{
						text: 'Cancel',
						role: 'cancel',
						handler: () => {
							console.log('Cancel clicked');
						}
					},
					{
						text: 'Block',
						handler: () => {
							console.log('Request cancelled');
							this.userSrvc.block(id);
						}
					}
				]
			});
			alert.present();
			this.blockAlertPresented = true;
		} else {
			this.userSrvc.block(id);
		}
  }
  unlike(id: string){
		if(!this.unlikeAlertPresented){
    // alert
    let message = 'Are you sure?';
    if(this.currentUser.contacts.forEach(contact => contact.id === this.user.id)){
      message = "Do you want to cancel your friend request?";
    } else {
      message = "Do you want to remove user from your contacts list?"
    }
    // check if it's just a request or a friendship
    const alert = this.alertCtrl.create({
      title: 'Confirm Like',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            console.log('Request cancelled');
            this.userSrvc.removeRequest(id);
          }
        }
      ]
    });
		alert.present();
		this.unlikeAlertPresented = true;
		} else {
			this.userSrvc.removeRequest(id);
		}
  }
}
