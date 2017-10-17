import { Component, Input } from '@angular/core';
import { User } from '../../models/models';
/*
  Generated class for the ProfileTimeline component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'profile-timeline',
  templateUrl: 'profile-timeline.html'
})
export class ProfileTimelineComponent {
  @Input() user: User;
  @Input() currentUser: User;

    animateClass: any;
  constructor() {
    this.animateClass = { 'zoom-in': true };
  }

}
