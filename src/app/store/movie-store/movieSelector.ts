import { createSelector, createFeatureSelector } from '@ngrx/store'
import { MovieState } from './movieState'
// import { isNewFilterObject } from '@/app/shared/helperFunctions'
import { CategoryMovies } from '@/app/services/types/movie-service-type'
import { Movie } from '@/app/shared/type/movie'
import { state } from '@angular/animations'

export const selectMovie = createFeatureSelector<MovieState>('movieState')

export const selectCategoryType = createSelector(selectMovie, (state): CategoryMovies => state.categoryMovies)

export const selectMovieGenre = createSelector(selectMovie, (state) => state.movieGenre)

export const selectLanguage = createSelector(selectMovie, (state) => state.languageList)
export const selectMovieWithCat = createSelector(selectMovie, selectMovieGenre, (state, genreList): Movie[] => {
    if (!state.moviesListWithCat || !genreList) return []
    const newMovieListWithGenre = state.moviesListWithCat.map((movie) => {
        const updateGenre = movie.genre_ids.map((genreId) => {
            const genre = genreList.find((g) => g.id === genreId)
            return genre ? genre.name : genreId
        })
        return {
            ...movie,
            genre_ids: updateGenre
        }
    })
    return newMovieListWithGenre
})
export const selectAllMovieList = createSelector(selectMovie, (state) => state.allMoviesList)
// export const selectAllMovieList = createSelector(selectMovie, (state) =>
//     getAllListWithoutDuplicate(state.allMoviesList)
// )
// export const selectMovieList = createSelector(selectMovie, (state): Movie[] => {
//     const filteredMovies: Movie[] = state
//         .allMoviesList!.filter((movieList) => movieList.category === state.selectCategory)
//         .flatMap((movieList) => movieList.results)

//     return filteredMovies
// })

// export const selectMovieById = createSelector(selectMovie, selectAllMovieList, (state, allMoviesList) =>
//     allMoviesList?.find((movie) => movie.id === state.movieId)
// )
// export const selectFavouriteList = createSelector(selectMovie, (state) => state.favouriteList)

// export const selectWatchList = createSelector(selectMovie, (state) => state.watchList)

// export const selectMovieStatus = createSelector(selectMovie, (state) => {
//     return {
//         success: state.success,
//         error: state.error
//     }
// })

// export const selectFilterParams = createSelector(selectMovie, (state) => state.filterValue)

// export const selectFilteredMovieListWithParams = createSelector(
//     selectMovie,
//     selectAllMovieList,
//     (state, allMoviesList) => {
//         let filterMovie = state.filterValue
//             ? allMoviesList?.filter((movie) => isNewFilterObject(movie, state.filterValue))
//             : allMoviesList
//         return filterMovie
//     }
// )

// export const selectFilteredAndSortMovieListWithParams = createSelector(
//     selectMovie,
//     selectFilteredMovieListWithParams,
//     (state, filterMovie) => {
//         if (!filterMovie) return filterMovie
//         const moviesCopy = [...filterMovie]
//         switch (state.sortValue) {
//             case 'popular':
//                 return moviesCopy.sort((a, b) => b.popularity - a.popularity)
//             case 'date':
//                 return moviesCopy.sort(
//                     (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
//                 )
//             case 'rating':
//                 return moviesCopy.sort((a, b) => b.vote_average - a.vote_average)
//             default:
//                 return moviesCopy
//         }
//     }
// )

// function getAllListWithoutDuplicate(arr: MoviePage[] | null): Movie[] {
//     let moviesArr: Movie[] = []
//     if (arr) {
//         arr.forEach((movie) => {
//             moviesArr.push(...movie.results)
//         })
//         // фільтрація масиву для уникнення повторення фільму
//         // незрозуміло чому не працює new Set
//         moviesArr = moviesArr.filter((movie, index, arr) => index === arr.findIndex((m) => m.id === movie.id))
//     } else return []
//     return moviesArr
// }
