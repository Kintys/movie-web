import { MovieReducer, initialState } from '@/app/store/movie-store/movieReducer'
import { addToFavouriteListFailure } from '@/app/store/movie-store/movieActions'

describe('Movie Reducer', () => {
    it('should handle addToFavouriteListFailure', () => {
        const error = 'Error adding movie to favourites'
        const action = addToFavouriteListFailure({ error })
        const state = MovieReducer(initialState, action)

        expect(state.error).toEqual(error)
    })
})
