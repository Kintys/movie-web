import {
    loadMoviesListWithCat,
    loadAllMovies,
    loadAllMoviesSuccess,
    loadAllMoviesFailure
} from '@/app/store/movie-store/movieActions'
import { movieMockArr, movieMockPageArr } from '@/app/shared/mock-data'
import { loadMovieID } from '@/app/store/movie-store/movieActions'
import { CategoryMovies, Genre, MoviePage } from '@/app/shared/type-declorate'

describe('Movie Actions', () => {
    it('should create the loadMoviesListWithCat action', () => {
        const category = 'Action'
        const action = loadMoviesListWithCat({ category })
        expect(action.type).toBe('[MoviesList] Load Movies List With Category')
        expect(action.category).toBe(category)
    })
})

describe('Movie Actions', () => {
    it('should create the loadMovieID action', () => {
        const movieId = 1
        const action = loadMovieID({ movieId })
        expect(action.type).toBe('[All Movies] Load Movie ID')
        expect(action.movieId).toBe(movieId)
    })
})
describe('Movie Actions', () => {
    it('should create the loadAllMovies action', () => {
        const categoryObj: CategoryMovies = {
            popular: '',
            nowPlaying: '',
            topRate: '',
            upcoming: ''
        }
        const action = loadAllMovies({ categoryObj })
        expect(action.type).toBe('[All Movies] Load All Movies')
        expect(action.categoryObj).toBe(categoryObj)
    })

    it('should create the loadAllMoviesSuccess action', () => {
        const movies: MoviePage[] = movieMockPageArr
        const movieGenre: Genre[] = [{ id: 1, name: 'Action' }]
        const action = loadAllMoviesSuccess({ movies, movieGenre })
        expect(action.type).toBe('[MoviesList] Load All Movies Success!')
        expect(action.movies).toBe(movies)
        expect(action.movieGenre).toBe(movieGenre)
    })

    it('should create the loadAllMoviesFailure action', () => {
        const error = { message: 'Error loading movies' }
        const action = loadAllMoviesFailure({ error })
        expect(action.type).toBe('[All Movies] Load All Movies Failure!')
        expect(action.error).toBe(error)
    })
})
