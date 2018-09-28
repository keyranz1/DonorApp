import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Priority } from "../../enums/priority";

@Directive({
  selector: '[patient-priority]' // Attribute selector
})
export class PatientPriorityDirective implements AfterViewInit {
  @Input('patient-priority') response: any;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    switch (parseInt(this.response)) {
      case Priority.Urgent:
        return this.renderer.setStyle(this.elementRef.nativeElement, 'background', '#AD0000');
      case Priority.Regular:
        return this.renderer.setStyle(this.elementRef.nativeElement, 'background', '#0AA486');
      case Priority.Backup:
        return this.renderer.setStyle(this.elementRef.nativeElement, 'background', '#FFDA44');
    }

  }

}
