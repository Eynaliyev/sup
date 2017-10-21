import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../services/services';
import { RequestService } from '../../services/services';
import {User} from '../../models/models';
import {Contact} from '../../models/models';
@Component({
  selector: 'page-requests-list',
  templateUrl: 'requests-list.html'
})
export class RequestsListPage {
  requests : any[] = [];
  animateClass: any;
  currentUser: User;

  constructor(
    public navCtrl: NavController,
    private userService: UserService,
    private requestsSrvc: RequestService
  ) {
    console.log('ContactsListPage initialized');
    this.animateClass = { 'zoom-in': true };

  }
  ionViewWillEnter() {
  }
  ngAfterViewInit() {
    return new Promise(resolve => {
      let env = this;
      this.userService.getCurrentUser().subscribe(user => {
        this.currentUser = user;
        this.requestsSrvc.getRequests(user.id).subscribe(requests => {
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
}
