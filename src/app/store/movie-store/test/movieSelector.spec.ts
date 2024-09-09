import { MovieState } from '../movieState'
import { selectCategoryType, selectMovieList } from '../movieSelector'
import { movieMockArr } from '@/app/shared/mock-data'

describe('Movie Selectors', () => {
    const mockState: MovieState = {
        categoryMovies: {
            nowPlaying: '',
            popular: '',
            topRate: '',
            upcoming: ''
        },
        moviesListWithCat: movieMockArr,
        movieGenre: null,
        favouriteList: null,
        watchList: null,
        filterValue: null,
        sortValue: null,
        allMoviesList: null
    }

    it('should select categoryMovies', () => {
        const result = selectCategoryType.projector(mockState)
        expect(result).toEqual(mockState.categoryMovies)
    })
})
