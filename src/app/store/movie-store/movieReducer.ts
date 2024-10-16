import { createReducer, on } from '@ngrx/store'
import { initialState } from './movieState'
import {
    addFilterValue,
    loadMovieListWithFilterParamsFailure,
    loadMovieListWithFilterParamsSuccess,
    loadMovieWithSearchTextFailure,
    loadMovieWithSearchTextSuccess,
    // loadMovieLanguageFailure,
    // loadMovieLanguageSuccess,
    // addSortValue,
    // addToFavouriteListFailure,
    // addToFavouriteListSuccess,
    // addToWatchListFailure,
    // addToWatchListSuccess,
    // deleteMovieFromFavouriteListFailure,
    // deleteMovieFromFavouriteListSuccess,
    // deleteMovieFromWatchListFailure,
    // deleteMovieFromWatchListSuccess,
    // deleteMovieStatus,
    // loadAllMoviesSuccess,
    // loadFavouriteListFailure,
    // loadFavouriteListSuccess,
    // loadMovieID,
    loadMoviesListWithCat,
    loadMoviesListWithCatFailure,
    loadMoviesListWithCatSuccess
    // loadWatchListFailure,
    // loadWatchListSuccess
} from './movieActions'
// import { Movie, MoviePage } from '@/app/shared/type-declorate'
export const MovieReducer = createReducer(
    initialState,
    on(loadMoviesListWithCatSuccess, (state, { movies, genre }) => {
        return {
            ...state,
            moviesListWithCat: movies,
            movieGenre: genre
        }
    }),
    on(addFilterValue, (state, { filterValue }) => {
        return {
            ...state,
            filterValue: filterValue
        }
    }),
    on(loadMovieListWithFilterParamsSuccess, (state, { movies, genre }) => {
        console.log(movies)
        return {
            ...state,
            allMoviesList: movies,
            movieGenre: genre
        }
    }),
    on(loadMovieListWithFilterParamsFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        }
    }),
    on(loadMovieWithSearchTextSuccess, (state, { movieList }) => {
        return {
            ...state,
            allMoviesList: movieList
        }
    }),
    on(loadMovieWithSearchTextFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        }
    })
    // on(loadMovieLanguageSuccess, (state, { languageList }) => {
    //     return {
    //         ...state,
    //         languageList: languageList
    //     }
    // }),
    // on(loadMovieLanguageFailure, (state, { error }) => {
    //     return {
    //         ...state,
    //         error: error
    //     }
    // })

    // movie list
    // on(loadMoviesListWithCat, (state, { category }) => {
    //     return {
    //         ...state,
    //         selectCategory: category
    //     }
    // })

    // on(loadMoviesListWithCatFailure, (state, { error }) => {
    //     return {
    //         ...state,
    //         error: error
    //     }
    // }),
    //     on(loadMovieID, (state, { movieId }) => {
    //         return {
    //             ...state,
    //             movieId: movieId
    //         }
    //     }),
    //     // all movie list
    //     on(loadAllMoviesSuccess, (state, { movies, movieGenre }) => {
    //         let updatedMovies: MoviePage[]
    //         if (movies) {
    //             updatedMovies = movies?.map((movieList, index) => {
    //                 const categoryKey = Object.keys(state.categoryMovies)[index]
    //                 const category = state.categoryMovies[categoryKey]
    //                 return {
    //                     ...movieList,
    //                     category: category
    //                 }
    //             })
    //         } else updatedMovies = []

    //         return {
    //             ...state,
    //             allMoviesList: updatedMovies,
    //             movieGenre: movieGenre
    //         }
    //     }),
    //     // favourite List
    //     on(loadFavouriteListSuccess, (state, { favouriteList }) => {
    //         return {
    //             ...state,
    //             favouriteList: favouriteList
    //         }
    //     }),
    //     on(loadFavouriteListFailure, (state, { error }) => {
    //         return {
    //             ...state,
    //             error: error
    //         }
    //     }),
    //     on(addToFavouriteListSuccess, (state) => {
    //         return {
    //             ...state
    //         }
    //     }),
    //     on(addToFavouriteListFailure, (state, { error }) => {
    //         return {
    //             ...state,
    //             error: error
    //         }
    //     }),
    //     on(deleteMovieFromFavouriteListSuccess, (state) => {
    //         return {
    //             ...state
    //         }
    //     }),
    //     on(deleteMovieFromFavouriteListFailure, (state, { error }) => {
    //         return {
    //             ...state,
    //             error: error
    //         }
    //     }),
    //     //watch list
    //     on(loadWatchListSuccess, (state, { watchList }) => {
    //         return {
    //             ...state,
    //             watchList: watchList
    //         }
    //     }),
    //     on(loadWatchListFailure, (state, { error }) => {
    //         return {
    //             ...state,
    //             error: error
    //         }
    //     }),
    //     on(addToWatchListSuccess, (state) => {
    //         return {
    //             ...state
    //         }
    //     }),
    //     on(addToWatchListFailure, (state, { error }) => {
    //         return {
    //             ...state,
    //             error: error
    //         }
    //     }),
    //     on(deleteMovieFromWatchListSuccess, (state) => {
    //         return {
    //             ...state
    //         }
    //     }),
    //     on(deleteMovieFromWatchListFailure, (state, { error }) => {
    //         return {
    //             ...state,
    //             error: error
    //         }
    //     }),
    //     //success status
    //     on(deleteMovieStatus, (state) => {
    //         return {
    //             ...state,
    //             error: null,
    //             success: null
    //         }
    //     }),

    //     on(addSortValue, (state, { sortValue }) => {
    //         return {
    //             ...state,
    //             sortValue: sortValue
    //         }
    //     })
)

function getCopyItem(val: any) {
    return JSON.parse(JSON.stringify(val))
}

export { initialState }
