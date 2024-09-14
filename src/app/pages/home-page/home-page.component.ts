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

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [MainBannerSectionComponent, MovieCardComponent, AsyncPipe, ImageModule, PrefixUrlPipe],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
    selectedCat$!: Observable<any>
    selectedMovie$!: Observable<any>
    movie: Movie | undefined
    constructor(private readonly store: Store) {}
    ngOnInit(): void {
        this.selectedCat$ = this.store.select(selectCategoryType)
        this.selectedCat$.subscribe((val) => {
            this.store.dispatch(loadMoviesListWithCat({ category: val.nowPlaying }))
        })
        // this.service.getMovieListWitCat(val.now_playing).subscribe((val) => console.log(val))
        this.selectedMovie$ = this.store.select(selectMovieWithCat)
        this.selectedMovie$.subscribe((val) => (this.movie = val[0]))
    }
}
