import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {DonorResponse} from "../../enums/donor-response-enum";

/**
 * Generated class for the InfoCardDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[info-card]' // Attribute selector
})
export class InfoCardDirective {
  @Input('info-card') response: any;


  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    console.log(this.response);
    switch (parseInt(this.response)) {
      case DonorResponse.Ready:
        return this.renderer.setStyle(this.elementRef.nativeElement, 'background', '#75C574');
      case DonorResponse.NotReady:
        return this.renderer.setStyle(this.elementRef.nativeElement, 'background', '#C64F4D');
      case DonorResponse.NoResponse:
        return this.renderer.setStyle(this.elementRef.nativeElement, 'background', '#7EA4A8');
    }

  }

}
