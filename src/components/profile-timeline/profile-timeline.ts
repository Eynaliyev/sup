import { Component, Input } from '@angular/core';
import { User } from '../../models/models';

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
