import { Movie } from '@/app/shared/type/movie'
import { selectMovieWithCat } from '@/app/store/movie-store/movieSelector'
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { SwiperContainer } from 'swiper/element'
import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { PrefixUrlPipe } from '@/app/shared/pipes/prefix-url/prefix-url.pipe'
import { ImageModule } from 'primeng/image'
import { RatingModule } from 'primeng/rating'
import { RatingPipe } from '@/app/shared/pipes/movie-rating/rating.pipe'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-movies-carousel',
    standalone: true,
    imports: [PrefixUrlPipe, RatingPipe, MovieCardComponent, ImageModule, RatingModule, FormsModule],
    templateUrl: './movies-carousel.component.html',
    styleUrl: './movies-carousel.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoviesCarouselComponent implements OnInit {
    @ViewChild('mySwiper') swiper!: ElementRef<SwiperContainer>
    movie: Movie | undefined
    selectedMovie$?: Observable<any>
    movieData?: Movie[]
    constructor(private readonly store: Store) {}
    ngOnInit(): void {
        this.selectedMovie$ = this.store.select(selectMovieWithCat)
        this.selectedMovie$.subscribe((val) => (this.movieData = val))
    }
    ngAfterViewInit(): void {
        Object.assign(this.swiper.nativeElement, {
            slidesPerView: 6,
            speed: 800,
            autoplay: {
                delay: 5000,
                pauseOnMouseEnter: true
            },
            loop: true
        })
        this.swiper.nativeElement.initialize()
    }
}
