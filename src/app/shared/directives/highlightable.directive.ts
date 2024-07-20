import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightable]',
  standalone: true
})
export class HighlightableDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.transform = 'scale(1.05)';
    this.el.nativeElement.style.boxShadow = 'var(--primary-color) 0px 0px 10px';
    this.el.nativeElement.style.transition = 'all 300ms';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.transform = 'scale(1)';
    this.el.nativeElement.style.boxShadow = 'unset';
  }

}
