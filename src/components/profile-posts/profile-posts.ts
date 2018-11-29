import { Component } from '@angular/core';


@Component({
  selector: 'profile-posts',
  templateUrl: 'profile-posts.html'
})
export class ProfilePostsComponent {
    animateClass: any;
  constructor() {
        this.animateClass = { 'zoom-in': true };
  }

}
