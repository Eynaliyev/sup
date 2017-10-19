import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../services/services';
import { NotificationService } from '../../services/services';
import {User} from '../../models/models';
import {Notification} from '../../models/models';
@Component({
  selector: 'page-notifications-list',
  templateUrl: 'notifications-list.html'
})
export class NotificationsListPage {
  notifications : Notification[] = [];
  animateClass: any;
  currentUser: User;

  constructor(
    private navCtrl: NavController,
    private userSrvc: UserService,
    private notificationSrvc: NotificationService
  ) {
    console.log('ContactsListPage initialized');
    this.animateClass = { 'zoom-in': true };

  }
  ionViewWillEnter() {
  }
  ngAfterViewInit() {
    return new Promise(resolve => {
      let env = this;
      this.userSrvc.getCurrentUser().subscribe(user => {
        this.currentUser = user;
        this.notificationSrvc.getNotifications(user.id).subscribe(notifications => {
          let res = notifications.sort((first, second) => {
            return second.date.getTime() - first.date.getTime();
          });
          for (let i = 0; i < res.length; i++) {
              setTimeout(function() {
                  env.notifications.push(res[i]);
                  console.log('notifications in notificationsList: ', env.notifications);
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
}
