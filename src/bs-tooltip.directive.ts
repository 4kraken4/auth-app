import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

declare var bootstrap: any;

interface TooltipConfig {
  boundary: string;
  delay: {
    show: number;
    hide: number;
  };
  animation: boolean;
  html: boolean;
  trigger: string;
  placement: string;
  customClass: string;
}
@Directive({
  standalone: true,
  selector: '[bsTooltip]',
})
export class BootstrapTooltipDirective implements AfterViewInit {
  @Input('bsTooltip') type: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.setAttribute(
      this.el.nativeElement,
      'data-bs-toggle',
      'tooltip'
    );

    const ttConfig = this.getTooltipConfig();
    switch (this.type) {
      case 'success':
        break;
      case 'info':
        break;
      case 'warning':
        break;
      case 'error':
        break;
      default:
        break;
    }

    return this.createTooltip(ttConfig);
  }
  getTooltipConfig() {
    return {
      boundary: 'window',
      delay: { show: 400, hide: 200 },
      animation: true,
      html: true,
      trigger: 'hover',
      placement: 'top',
      customClass: 'tooltip-' + this.type,
    };
  }

  private createTooltip(tooltipConfig: TooltipConfig) {
    return new bootstrap.Tooltip(this.el.nativeElement, tooltipConfig);
  }
}
