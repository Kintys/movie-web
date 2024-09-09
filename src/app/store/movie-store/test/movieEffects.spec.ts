import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { ReplaySubject, of, throwError } from 'rxjs'
import { MovieAPIService } from '@/app/services/movie-api.service'
import * as MovieActions from '@/app/store/movie-store/movieActions'

import { MovieEffects } from '../movieEffects'

describe('MovieEffects', () => {
    let effects: MovieEffects
    let actions$: ReplaySubject<any>
    let movieAPIService: jest.Mocked<MovieAPIService>

    beforeEach(() => {
        movieAPIService = {
            getMovieListWitCat: jest.fn(),
            getAllMovies: jest.fn(),
            getMovieGenre: jest.fn(),
            getFavouriteListFromApi: jest.fn(),
            setItemToFavouriteList: jest.fn(),
            deleteItemFromFavouriteList: jest.fn(),
            getWatchListFromApi: jest.fn(),
            setItemToWatchList: jest.fn(),
            deleteItemFromWatchList: jest.fn()
        } as unknown as jest.Mocked<MovieAPIService>

        TestBed.configureTestingModule({
            providers: [
                MovieEffects,
                provideMockActions(() => actions$),
                provideMockStore(),
                { provide: MovieAPIService, useValue: movieAPIService }
            ]
        })

        effects = TestBed.inject(MovieEffects)
        actions$ = new ReplaySubject(1)
    })

    it('should be created', () => {
        expect(effects).toBeTruthy()
    })

    it('should return loadAllMoviesFailure on error', (done) => {
        const action = MovieActions.loadAllMovies({
            categoryObj: {
                popular: '',
                nowPlaying: '',
                topRate: '',
                upcoming: ''
            }
        })
        const error = new Error('Failed to load movies')

        actions$.next(action)
        movieAPIService.getAllMovies.mockReturnValue(throwError(() => error))
        movieAPIService.getMovieGenre.mockReturnValue(throwError(() => error))

        effects.loadAllMovies$.subscribe((result: any) => {
            expect(result).toEqual(MovieActions.loadAllMoviesFailure({ error }))
            done()
        })
    })
})
