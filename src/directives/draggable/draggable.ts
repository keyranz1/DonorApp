import { Directive, ElementRef, Renderer } from '@angular/core';
import { DomController } from "ionic-angular";

@Directive({
  selector: '[draggable]'
})
export class DraggableDirective {

  screenWidth: number;
  screenHeight: number;
  elementWidth: number;
  elementXPosition: number;
  elementYPosition: number;

  constructor(private elementRef: ElementRef, private renderer: Renderer, private domCtrl: DomController) {
    this.elementXPosition = 0;
    this.elementYPosition = 0;
  }

  ngAfterViewInit() {
    this.screenWidth = this.elementRef.nativeElement.parentElement.clientWidth;
    this.elementWidth = this.elementRef.nativeElement.clientWidth;
    this.screenHeight = this.elementRef.nativeElement.parentElement.clientHeight;

    this.renderer.setElementStyle(this.elementRef.nativeElement, 'position', 'fixed');
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'left', (this.screenWidth - this.elementWidth) + 'px');
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'top', '90%');
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'opacity', '0.6');

    let hammer = new window['Hammer'](this.elementRef.nativeElement);
    hammer.get('pan').set({direction: window['Hammer'].DIRECTION_ALL});
    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });
  }

  handlePan(ev) {
    this.elementYPosition = ev.center.y - 20;
    this.elementXPosition = ev.center.x - 20;
    let newLeft = this.elementXPosition;
    let newTop = this.elementYPosition;

    if (this.elementXPosition < (this.screenWidth / 2) && ev.isFinal) {
      this.domCtrl.write(() => {
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'left', '0px');
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'top', newTop + 'px');
        this.renderer.setElementStyle(this.elementRef.nativeElement.parentElement.nextSibling, 'overflow-y', 'scroll');
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'opacity', '0.6');
      });
    } else if ( this.elementXPosition > (this.screenWidth / 2) && ev.isFinal) {
      this.domCtrl.write(() => {
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'left', (this.screenWidth - this.elementWidth) + 'px');
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'top', newTop + 'px');
        this.renderer.setElementStyle(this.elementRef.nativeElement.parentElement.nextSibling, 'overflow-y', 'scroll');
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'opacity', '0.6');
      });
    } else {
      this.domCtrl.write(() => {
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'left', newLeft + 'px');
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'top', newTop + 'px');
        this.renderer.setElementStyle(this.elementRef.nativeElement.parentElement.nextSibling, 'overflow-y', 'hidden');
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'opacity', '1');
      });
    }
  }
}
