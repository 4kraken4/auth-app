import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

declare var bootstrap: any;

@Directive({
  standalone: true,
  selector: '[bsTooltip]',
})
export class BootstrapTooltipDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.setAttribute(
      this.el.nativeElement,
      'data-bs-toggle',
      'tooltip'
    );

    const tooltip = new bootstrap.Tooltip(this.el.nativeElement, {
      boundary: 'window',
      delay: { show: 400, hide: 200 },
      animation: true,
      html: true,
      trigger: 'hover',
      placement: 'top',
      customClass: 'tooltip-error-custom',
    });

    return tooltip;
  }
}
