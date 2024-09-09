import { CategoryMovies } from '@/app/services/types/movie-service-type'
import { Movie } from '@/app/shared/type/movie'

export interface MovieState {
    moviesListWithCat: Movie[] | null
    // allMoviesList: MoviePage[] | null
    //  movieGenre: Genre[] | null
    // favouriteList: Movie[] | null
    // watchList: Movie[] | null
    categoryMovies: CategoryMovies
    // filterValue: any[] | null
    // sortValue: string | null
    // movieId?: number | string | null
    // error?: string | null
    // success?: string | null
    // selectCategory?: string
}
export const initialState: MovieState = {
    moviesListWithCat: null,
    // allMoviesList: null,
    // // movieGenre: null,
    // filterValue: null,
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
