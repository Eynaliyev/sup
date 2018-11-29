import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'gallery',
  templateUrl: 'gallery.html'
})
export class GalleryComponent {

  @Input() data: any;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();
  image: any;
  animateClass: any;

  constructor() {
      this.animateClass = { 'zoom-in': true };
  }

  changeImage(image){
    this.image = image;
    this.change.emit(this.image);
  }

}
