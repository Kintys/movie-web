import { ClearObservable } from '@/app/shared/clearObserveble'
import { PrefixUrlPipe } from '@/app/shared/pipes/prefix-url/prefix-url.pipe'
import { Movie } from '@/app/shared/type/movie'
import { selectMovieWithCat } from '@/app/store/movie-store/movieSelector'
import { AsyncPipe } from '@angular/common'
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Store } from '@ngrx/store'
import { ImageModule } from 'primeng/image'
import { takeUntil } from 'rxjs'
import { SwiperContainer } from 'swiper/element'
import { MovieDescriptionComponent } from '../movie-description/movie-description.component'

@Component({
    selector: 'app-main-banner-section',
    standalone: true,
    imports: [AsyncPipe, PrefixUrlPipe, ImageModule, MovieDescriptionComponent],
    templateUrl: './main-banner-section.component.html',
    styleUrl: './main-banner-section.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainBannerSectionComponent extends ClearObservable implements AfterViewInit, OnInit {
    @ViewChild('mySwiper') swiper!: ElementRef<SwiperContainer>
    index: number = 0
    selectedMovie$ = this.store.select(selectMovieWithCat)
    movieData?: Movie[] | null
    constructor(private store: Store) {
        super()
    }
    ngOnInit(): void {
        this.selectedMovie$.pipe(takeUntil(this.destroy$)).subscribe((val) => (this.movieData = val))
    }
    ngAfterViewInit(): void {
        Object.assign(this.swiper.nativeElement, {
            slidesPerView: 3,
            centeredSlides: true,
            speed: 800,
            navigation: { nextEl: '.banner-swiper__next-arrow', prevEl: '.banner-swiper__prev-arrow' },
            pagination: {
                clickable: true,
                el: '.banner-swiper__bar',
                bulletClass: 'bullet-some',
                bulletActiveClass: 'bullet-some__active'
            },
            width: 1100,
            effect: 'creative',
            initialSlide: 1,
            autoplay: {
                delay: 5000,
                pauseOnMouseEnter: true
            },
            creativeEffect: {
                limitProgress: 1,
                perspective: true,
                prev: {
                    shadow: true,
                    translate: ['-50%', 0, -200],
                    scale: 0.8
                },
                next: {
                    shadow: true,
                    translate: ['50%', 0, -200],
                    scale: 0.8
                }
            }
        })
        this.swiper.nativeElement.initialize()
    }

    slideChange(swiper: any) {
        this.index = swiper.detail[0].activeIndex
    }
}
