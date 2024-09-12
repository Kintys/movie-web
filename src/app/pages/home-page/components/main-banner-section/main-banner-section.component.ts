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
        this.selectedMovie$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
            this.movieData = val?.slice(0, 3)
            if (this.movieData) console.log(this.movieData[0])
        })
    }
    ngAfterViewInit(): void {
        Object.assign(this.swiper.nativeElement, {
            slidesPerView: 3,
            centeredSlides: true,
            pagination: { clickable: true, dynamicBullets: true },
            setWrapperSize: true,
            width: 1200,
            effect: 'creative',
            autoplay: {
                delay: 5000
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
