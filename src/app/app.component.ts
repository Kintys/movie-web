import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './components/header/header.component'
import { LoginPopupComponent } from './components/login-popup/login-popup.component'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { loadMoviesListWithCat } from './store/movie-store/movieActions'
import { selectCategoryType } from './store/movie-store/movieSelector'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, LoginPopupComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'movie-web'
    isOpenloginPopup: boolean = false
    selectedCat$!: Observable<any>
    constructor(private readonly store: Store) {}
    ngOnInit(): void {
        this.selectedCat$ = this.store.select(selectCategoryType)
        this.selectedCat$.subscribe((val) => {
            this.store.dispatch(loadMoviesListWithCat({ category: val.nowPlaying }))
        })
    }
}
