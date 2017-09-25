import { Component } from '@angular/core';

/*
  Generated class for the ProfilePosts component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
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
