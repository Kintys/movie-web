import { Injectable } from '@angular/core'
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators'
import {
    loadMoviesListWithCat,
    loadMoviesListWithCatSuccess,
    loadMoviesListWithCatFailure
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

@Injectable()
export class MovieEffects {
    constructor(private actions$: Actions, private movieAPIservices: MovieAPIService) {}
    loadMoviesListWithCat$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loadMoviesListWithCat),
                mergeMap((props) => {
                    return this.movieAPIservices.getMovieListWitCat(props.category).pipe(
                        map((movie) =>
                            loadMoviesListWithCatSuccess({
                                movies: movie.results
                            })
                        )
                    )
                })
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
    // loadAllMovies$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(loadAllMovies),
    //         switchMap((props) =>
    //             forkJoin([
    //                 this.movieAPIservices.getAllMovies(props.categoryObj),
    //                 this.movieAPIservices.getMovieGenre()
    //             ]).pipe(
    //                 map(([movies, genre]) =>
    //                     loadAllMoviesSuccess({
    //                         movies: movies,
    //                         movieGenre: genre.genres
    //                     })
    //                 ),
    //                 catchError((error) =>
    //                     of(
    //                         loadAllMoviesFailure({
    //                             error: error
    //                         })
    //                     )
    //                 )
    //             )
    //         )
    //     )
    // )
    // loadFavouriteList$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(loadFavouriteList),
    //         mergeMap(() => {
    //             return this.movieAPIservices.getFavouriteListFromApi().pipe(
    //                 map((movies) =>
    //                     loadFavouriteListSuccess({
    //                         favouriteList: movies.results
    //                     })
    //                 ),
    //                 catchError((error) =>
    //                     of(
    //                         loadFavouriteListFailure({
    //                             error: error
    //                         })
    //                     )
    //                 )
    //             )
    //         })
    //     )
    // )
    // addToFavouriteList$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(addToFavouriteList),
    //         mergeMap((props) => {
    //             return this.movieAPIservices.setItemToFavouriteList(props.movieId).pipe(
    //                 map(() => addToFavouriteListSuccess()),
    //                 catchError((error) =>
    //                     of(
    //                         addToFavouriteListFailure({
    //                             error: error
    //                         })
    //                     )
    //                 )
    //             )
    //         })
    //     )
    // )
    // deleteMovieFromFavouriteList$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(deleteMovieFromFavouriteList),
    //         mergeMap((props) => {
    //             return this.movieAPIservices.deleteItemFromFavouriteList(props.movieId).pipe(
    //                 switchMap(() => [deleteMovieFromFavouriteListSuccess(), loadFavouriteList()]),
    //                 catchError((error) =>
    //                     of(
    //                         deleteMovieFromFavouriteListFailure({
    //                             error: error
    //                         })
    //                     )
    //                 )
    //             )
    //         })
    //     )
    // )
    // loadWatchList$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(loadWatchList),
    //         mergeMap(() => {
    //             return this.movieAPIservices.getWatchListFromApi().pipe(
    //                 map((movies) =>
    //                     loadWatchListSuccess({
    //                         watchList: movies.results
    //                     })
    //                 ),
    //                 catchError((error) =>
    //                     of(
    //                         loadWatchListFailure({
    //                             error: error
    //                         })
    //                     )
    //                 )
    //             )
    //         })
    //     )
    // )
    // addToWatchList$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(addToWatchList),
    //         mergeMap((props) => {
    //             return this.movieAPIservices.setItemToWatchList(props.movieId).pipe(
    //                 map(() => addToWatchListSuccess()),
    //                 catchError((error) =>
    //                     of(
    //                         addToWatchListFailure({
    //                             error: error
    //                         })
    //                     )
    //                 )
    //             )
    //         })
    //     )
    // )
    // deleteMovieFromWatchList$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(deleteMovieFromWatchList),
    //         mergeMap((props) => {
    //             return this.movieAPIservices.deleteItemFromWatchList(props.movieId).pipe(
    //                 switchMap(() => [deleteMovieFromWatchListSuccess(), loadWatchList()]),
    //                 catchError((error) =>
    //                     of(
    //                         deleteMovieFromWatchListFailure({
    //                             error: error
    //                         })
    //                     )
    //                 )
    //             )
    //         })
    //     )
    // )
}
