import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, combineLatest, switchMap } from 'rxjs'
import { environment } from '@/environments/environment.development'
import { Store } from '@ngrx/store'
import { selectAccountId, selectSessionId } from '../store/user-store/userSelectors'
import {
    APILanguageResponse,
    ApiResponse,
    CategoryMovies,
    GenreModule,
    MoviePage,
    VideoResult
} from './types/movie-service-type'
@Injectable({
    providedIn: 'root'
})
export class MovieAPIService {
    readonly apiUrl = environment.apiUrl
    readonly apiKey = environment.apiKey
    readonly apiToken = environment.apiToken
    readonly headers = {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: this.apiToken
    }
    constructor(private http: HttpClient, private store: Store) {}

    // private get accountId() {
    //     let accountId
    //     this.store.select(selectAccountId).subscribe((id) => (accountId = id))
    //     return accountId
    // }
    // private get sessionId() {
    //     let sessionId
    //     this.store.select(selectSessionId).subscribe((id) => (sessionId = id))
    //     return sessionId
    // }
    public getMovieListWitCat(category: string | null): Observable<MoviePage> {
        return this.http.get<MoviePage>(`${this.apiUrl}movie/${category}${this.apiKey}`)
    }

    public getMovieVideo(movie_id: number | string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`https://api.themoviedb.org/3/movie/${movie_id}/videos`, {
            headers: this.headers
        })
    }
    public getLanguage(): Observable<APILanguageResponse[]> {
        return this.http.get<APILanguageResponse[]>(`${this.apiUrl}configuration/languages`, {
            headers: this.headers
        })
    }
    // public getAllMovies(categoryObj: CategoryMovies): Observable<MoviePage[]> {
    //     const observables = []
    //     for (const catName in categoryObj) {
    //         if (categoryObj.hasOwnProperty(catName)) {
    //             observables.push(this.getMovieListWitCat(categoryObj[catName]))
    //         }
    //     }
    //     return combineLatest(observables)
    // }
    // public getFavouriteListFromApi() {
    //     return this.http.get<MoviePage>(
    //         `${this.apiUrl}account/${this.accountId}/favorite/movies?language=en-US&page=1&session_id=${this.sessionId}&sort_by=created_at.asc`,
    //         {
    //             headers: this.headers
    //         }
    //     )
    // }
    // public getWatchListFromApi() {
    //     return this.http.get<MoviePage>(
    //         `${this.apiUrl}account/${this.accountId}/watchlist/movies?language=en-US&page=1&session_id=${this.sessionId}&sort_by=created_at.asc`,
    //         {
    //             headers: this.headers
    //         }
    //     )
    // }
    public getMovieGenre() {
        return this.http.get<GenreModule>(`${this.apiUrl}genre/movie/list?language=en`, {
            headers: this.headers
        })
    }
    // public setItemToFavouriteList(id: number | string) {
    //     return this.http.post<Movie>(
    //         `${this.apiUrl}account/${this.accountId}/favorite`,
    //         { media_type: 'movie', media_id: id, favorite: true },
    //         {
    //             headers: this.headers
    //         }
    //     )
    // }
    // public setItemToWatchList(id: number | string) {
    //     return this.http.post<Movie>(
    //         `${this.apiUrl}account/${this.accountId}/watchlist`,
    //         { media_type: 'movie', media_id: id, watchlist: true },
    //         {
    //             headers: this.headers
    //         }
    //     )
    // }
    // public deleteItemFromFavouriteList(id: number | string) {
    //     return this.http.post<Movie>(
    //         `https://api.themoviedb.org/3/account/${this.accountId}/favorite`,
    //         { media_type: 'movie', media_id: id, favorite: false },
    //         {
    //             headers: this.headers
    //         }
    //     )
    // }
    // public deleteItemFromWatchList(id: number | string) {
    //     return this.http.post<Movie>(
    //         `${this.apiUrl}account/${this.accountId}/watchlist`,
    //         { media_type: 'movie', media_id: id, watchlist: false },
    //         {
    //             headers: this.headers
    //         }
    //     )
    // }
}
