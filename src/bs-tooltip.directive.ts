import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

declare var bootstrap: any;

@Directive({
  standalone: true,
  selector: '[bsTooltip]',
})
export class BootstrapTooltipDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    console.log('BootstrapTooltipDirective constructor');
  }

  ngAfterViewInit(): void {
    this.renderer.setAttribute(
      this.el.nativeElement,
      'data-bs-toggle',
      'tooltip'
    );
    this.renderer.setAttribute(
      this.el.nativeElement,
      'data-bs-placement',
      'top'
    );
    this.renderer.setAttribute(this.el.nativeElement, 'data-bs-html', 'true');
    this.renderer.setAttribute(
      this.el.nativeElement,
      'data-bs-trigger',
      'hover'
    );
    this.renderer.setAttribute(this.el.nativeElement, 'data-bs-delay', '300');
    this.renderer.setAttribute(
      this.el.nativeElement,
      'data-bs-animation',
      'true'
    );
    // this.renderer.setAttribute(
    //   this.el.nativeElement,
    //   'data-bs-custom-class',
    //   'tooltip-custom'
    // );
    return new bootstrap.Tooltip(this.el.nativeElement);
  }
}
