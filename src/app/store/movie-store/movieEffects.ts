import { Injectable } from '@angular/core'
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators'
import {
    loadMoviesListWithCat,
    loadMoviesListWithCatSuccess,
    loadMoviesListWithCatFailure,
    loadMovieListWithFilterParams,
    loadMovieListWithFilterParamsFailure,
    loadMovieListWithFilterParamsSuccess,
    findMovieWithSearchText,
    loadMovieWithSearchTextSuccess,
    loadMovieWithSearchTextFailure
    // loadMovieLanguage,
    // loadMovieLanguageFailure,
    // loadMovieLanguageSuccess
    // loadAllMovies,
    // loadAllMoviesSuccess,
    // loadAllMoviesFailure,
    // loadFavouriteList,
    // loadFavouriteListSuccess,
    // loadFavouriteListFailure,
    // addToFavouriteList,
    // addToFavouriteListSuccess,
    // addToFavouriteListFailure,
    // deleteMovieFromFavouriteList,
    // deleteMovieFromFavouriteListSuccess,
    // deleteMovieFromFavouriteListFailure,
    // loadWatchList,
    // loadWatchListSuccess,
    // addToWatchList,
    // deleteMovieFromWatchList,
    // addToWatchListSuccess,
    // addToWatchListFailure,
    // loadWatchListFailure,
    // deleteMovieFromWatchListSuccess,
    // deleteMovieFromWatchListFailure
} from '@/app/store/movie-store/movieActions'
import { forkJoin, of } from 'rxjs'
import { MovieAPIService } from '@/app/services/movie-api.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { loadAccountWithPassAndEmailSuccess } from '../user-store/userActions'

@Injectable()
export class MovieEffects {
    constructor(private actions$: Actions, private movieAPIservices: MovieAPIService) {}
    loadMoviesListWithCat$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loadMoviesListWithCat),
                switchMap(
                    (props) =>
                        forkJoin([
                            this.movieAPIservices.getMovieListWitCat(props.category),
                            this.movieAPIservices.getMovieGenre()
                        ]).pipe(
                            map(([movieRes, genreRes]) =>
                                loadMoviesListWithCatSuccess({
                                    movies: movieRes.results,
                                    genre: genreRes.genres
                                })
                            )
                        )
                    //  {
                    //   return this.movieAPIservices.getMovieListWitCat(props.category).pipe(
                    //     map((movie) =>
                    //       loadMoviesListWithCatSuccess({
                    //         movies: movie.results,
                    //       })
                    //     )
                    //   );
                    // }
                )
            )

        // this.actions$.pipe(
        //     ofType(loadMoviesListWithCat),
        //     mergeMap((props) => {
        //         return this.movieAPIservices.getMovieListWitCat(props.category).pipe(
        //             map((movies) =>
        //                 loadMoviesListWithCatSuccess({
        //                     movies: movies.results
        //                 })
        //             )
        //             // catchError((error) =>
        //             //     of(
        //             //         loadMoviesListWithCatFailure({
        //             //             error: error
        //             //         })
        //             //     )
        //             // )
        //         )
        //     })
        // )
    )
    loadMovieListWithFilterParams$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadMovieListWithFilterParams),
            mergeMap((props) =>
                this.movieAPIservices.getMovieWithFilterParams(props.filterParams).pipe(
                    map((movieRes) =>
                        loadMovieListWithFilterParamsSuccess({
                            movieList: movieRes.results
                        })
                    ),
                    catchError((err) => {
                        console.log(err)
                        return of(
                            loadMovieListWithFilterParamsFailure({
                                error: err
                            })
                        )
                    })
                )
            )
        )
    )
    findMovieWithSearchText$ = createEffect(() =>
        this.actions$.pipe(
            ofType(findMovieWithSearchText),
            mergeMap((props) =>
                this.movieAPIservices.getMovieListWithTextName(props.searchText).pipe(
                    map(
                        (movieRes) =>
                            loadMovieWithSearchTextSuccess({
                                movieList: movieRes.results
                            }),
                        catchError((err) =>
                            of(
                                loadMovieWithSearchTextFailure({
                                    error: err
                                })
                            )
                        )
                    )
                )
            )
        )
    )
    // loadMovieLanguage$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(loadMovieLanguage),
    //         switchMap(() =>
    //             this.movieAPIservices.getLanguage().pipe(
    //                 map((languageList) =>
    //                     loadMovieLanguageSuccess({
    //                         languageList: languageList
    //                     })
    //                 ),
    //                 catchError((error) => {
    //                     return of(loadMovieLanguageFailure({ error: error }))
    //                 })
    //             )
    //         )
    //     )
    // )
    // loadAllMovies$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(loadAllMovies),
    //     switchMap((props) =>
    //       forkJoin([
    //         this.movieAPIservices.getAllMovies(props.categoryObj),
    //         this.movieAPIservices.getMovieGenre(),
    //       ]).pipe(
    //         map(([movies, genre]) =>
    //           loadAllMoviesSuccess({
    //             movies: movies,
    //             movieGenre: genre.genres,
    //           })
    //         ),
    //         catchError((error) =>
    //           of(
    //             loadAllMoviesFailure({
    //               error: error,
    //             })
    //           )
    //         )
    //       )
    //     )
    //   )
    // );
    // loadFavouriteList$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(loadFavouriteList),
    //     mergeMap(() => {
    //       return this.movieAPIservices.getFavouriteListFromApi().pipe(
    //         map((movies) =>
    //           loadFavouriteListSuccess({
    //             favouriteList: movies.results,
    //           })
    //         ),
    //         catchError((error) =>
    //           of(
    //             loadFavouriteListFailure({
    //               error: error,
    //             })
    //           )
    //         )
    //       );
    //     })
    //   )
    // );
    // addToFavouriteList$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(addToFavouriteList),
    //     mergeMap((props) => {
    //       return this.movieAPIservices.setItemToFavouriteList(props.movieId).pipe(
    //         map(() => addToFavouriteListSuccess()),
    //         catchError((error) =>
    //           of(
    //             addToFavouriteListFailure({
    //               error: error,
    //             })
    //           )
    //         )
    //       );
    //     })
    //   )
    // );
    // deleteMovieFromFavouriteList$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(deleteMovieFromFavouriteList),
    //     mergeMap((props) => {
    //       return this.movieAPIservices
    //         .deleteItemFromFavouriteList(props.movieId)
    //         .pipe(
    //           switchMap(() => [
    //             deleteMovieFromFavouriteListSuccess(),
    //             loadFavouriteList(),
    //           ]),
    //           catchError((error) =>
    //             of(
    //               deleteMovieFromFavouriteListFailure({
    //                 error: error,
    //               })
    //             )
    //           )
    //         );
    //     })
    //   )
    // );
    // loadWatchList$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(loadWatchList),
    //     mergeMap(() => {
    //       return this.movieAPIservices.getWatchListFromApi().pipe(
    //         map((movies) =>
    //           loadWatchListSuccess({
    //             watchList: movies.results,
    //           })
    //         ),
    //         catchError((error) =>
    //           of(
    //             loadWatchListFailure({
    //               error: error,
    //             })
    //           )
    //         )
    //       );
    //     })
    //   )
    // );
    // addToWatchList$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(addToWatchList),
    //     mergeMap((props) => {
    //       return this.movieAPIservices.setItemToWatchList(props.movieId).pipe(
    //         map(() => addToWatchListSuccess()),
    //         catchError((error) =>
    //           of(
    //             addToWatchListFailure({
    //               error: error,
    //             })
    //           )
    //         )
    //       );
    //     })
    //   )
    // );
    // deleteMovieFromWatchList$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(deleteMovieFromWatchList),
    //     mergeMap((props) => {
    //       return this.movieAPIservices
    //         .deleteItemFromWatchList(props.movieId)
    //         .pipe(
    //           switchMap(() => [
    //             deleteMovieFromWatchListSuccess(),
    //             loadWatchList(),
    //           ]),
    //           catchError((error) =>
    //             of(
    //               deleteMovieFromWatchListFailure({
    //                 error: error,
    //               })
    //             )
    //           )
    //         );
    //     })
    //   )
    // );
}
