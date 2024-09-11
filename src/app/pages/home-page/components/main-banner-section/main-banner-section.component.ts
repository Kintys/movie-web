import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  effect,
} from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { register } from 'swiper/element/bundle';
import { SwiperDirective } from '@/app/shared/directive/swiper.directive';
import { EffectCreative } from 'swiper/modules';
register();
@Component({
  selector: 'app-main-banner-section',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './main-banner-section.component.html',
  styleUrl: './main-banner-section.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainBannerSectionComponent implements AfterViewInit {
  @ViewChild('mySwiper') swiper!: ElementRef<SwiperContainer>;
  index = 0;
  // swiperConfig: SwiperOptions = {
  //   spaceBetween: 10,
  //   pagination: { clickable: true, dynamicBullets: true },
  //   slidesPerView: 1,
  //   effect: 'cards',
  //   grabCursor: true,

  // };
  swiperConfig: SwiperOptions = {
    grabCursor: true,
    effect: 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    },

    // slidesPerView: 2

    // mousewheel: {
    //   invert: false,
    // },
  };

  ngAfterViewInit(): void {
    // Object.assign(this.swiper.nativeElement, this.swiperConfig);
    console.log(this.swiper.nativeElement);
    Object.assign(this.swiper.nativeElement, {
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      },
    });
    this.swiper.nativeElement.initialize();
  }

  slideChange(swiper: any) {
    console.log(swiper);
    this.index = swiper.detail[0].activeIndex;
  }
}
