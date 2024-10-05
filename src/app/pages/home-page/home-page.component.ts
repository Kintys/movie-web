import { MovieAPIService } from '@/app/services/movie-api.service'
import { loadMoviesListWithCat } from '@/app/store/movie-store/movieActions'
import { selectCategoryType, selectMovieWithCat } from '@/app/store/movie-store/movieSelector'
import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { MainBannerSectionComponent } from './components/main-banner-section/main-banner-section.component'
import { MovieCardComponent } from '../../components/movie-card/movie-card.component'
import { AsyncPipe } from '@angular/common'
import { Movie } from '@/app/shared/type/movie'
import { ImageModule } from 'primeng/image'
import { PrefixUrlPipe } from '@/app/shared/pipes/prefix-url/prefix-url.pipe'
import { ApiResponse } from '@/app/services/types/movie-service-type'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { RatingPipe } from '@/app/shared/pipes/movie-rating/rating.pipe'
import { RatingModule } from 'primeng/rating'
import { ButtonModule } from 'primeng/button'
import { MoviesCarouselComponent } from './components/movies-carousel/movies-carousel.component'
import { MoviePlayerComponent } from '../../components/movie-player/movie-player.component'
import { PlayerListComponent } from '../../components/player-list/player-list.component'
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component'

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [
        MainBannerSectionComponent,
        MovieCardComponent,
        AsyncPipe,
        ImageModule,
        FormsModule,
        RatingPipe,
        RatingModule,
        PrefixUrlPipe,
        ButtonModule,
        MoviesCarouselComponent,
        MoviePlayerComponent,
        PlayerListComponent,
        FilterPanelComponent
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
    selectedCat$!: Observable<any>
    selectedMovie$!: Observable<any>
    movie: Movie | undefined
    video: ApiResponse | undefined
    videoKey: string = ''
    nextVideo: any
    nextId: string = ''
    safeUrl?: SafeResourceUrl
    constructor(private readonly store: Store, private movieApi: MovieAPIService) {}
    ngOnInit(): void {
        this.selectedCat$ = this.store.select(selectCategoryType)
        this.selectedCat$.subscribe((val) => {
            this.store.dispatch(loadMoviesListWithCat({ category: val.nowPlaying }))
        })
        this.selectedMovie$ = this.store.select(selectMovieWithCat)
        this.selectedMovie$.subscribe((val) => {
            this.movieApi.getMovieVideo(val[3].id).subscribe((val) => {
                this.videoKey = val.results[1].key
                this.nextVideo = val.results
            })
        })
    }

    getVideo(id: string) {
        this.nextId = id
    }
}
