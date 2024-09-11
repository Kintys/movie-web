import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { SwiperOptions } from 'swiper/types';

@Directive({
  selector: '[appSwiper]',
  standalone: true,
})
export class SwiperDirective implements AfterViewInit {
  private readonly swiperElement: HTMLElement;
  @Input() config!: SwiperOptions;
  // config?: SwiperOptions;
  constructor(private el: ElementRef<HTMLElement>) {
    this.swiperElement = el.nativeElement;
  }
  ngAfterViewInit() {
    Object.assign(this.swiperElement, this.config);

    // @ts-ignore
    this.swiperElement.initialize();
  }
}
