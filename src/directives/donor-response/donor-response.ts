import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { DonorResponse } from "../../enums/donor-response-enum";

@Directive({
  selector: '[donor-response]' // Attribute selector
})
export class DonorResponseDirective implements AfterViewInit {
  @Input('donor-response') response: any;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
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
