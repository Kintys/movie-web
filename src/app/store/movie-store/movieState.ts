import { APILanguageResponse, CategoryMovies } from '@/app/services/types/movie-service-type'
import { Genre, Movie } from '@/app/shared/type/movie'

export interface MovieState {
    moviesListWithCat: Movie[] | null
    // allMoviesList: MoviePage[] | null
    movieGenre: Genre[] | null
    // favouriteList: Movie[] | null
    // watchList: Movie[] | null
    categoryMovies: CategoryMovies
    filterValue: any[] | null
    // sortValue: string | null
    // movieId?: number | string | null
    error?: string | null
    // success?: string | null
    // selectCategory?: string
    languageList: APILanguageResponse[] | null
}
export const initialState: MovieState = {
    moviesListWithCat: null,
    // allMoviesList: null,
    movieGenre: null,
    filterValue: null,
    languageList: null,
    // sortValue: null,
    // favouriteList: null,
    // watchList: null,
    categoryMovies: {
        nowPlaying: 'now_playing',
        popular: 'popular',
        topRate: 'top_rated',
        upcoming: 'upcoming'
    }
}
