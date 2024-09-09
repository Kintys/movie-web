// import { TestBed } from '@angular/core/testing'
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
// import { Store, StoreModule } from '@ngrx/store'
// import { of } from 'rxjs'
// import { MovieAPIService } from './movie-api.service'
// import { selectAccountId, selectSessionId } from '../store/user-store/userSelectors'
// import { GenreModule, MoviePage } from '../shared/type-declorate'
// import { environment } from '@/environments/environment.development'
// import { movieMockPageObj } from '../shared/mock-data'

// describe('MovieAPIService', () => {
//     let service: MovieAPIService
//     let httpMock: HttpTestingController
//     let store: Store

//     const mockMoviePage: MoviePage = movieMockPageObj

//     const mockGenreModule: GenreModule = {
//         genres: []
//     }

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [HttpClientTestingModule, StoreModule.forRoot({})],
//             providers: [
//                 MovieAPIService,
//                 {
//                     provide: Store,
//                     useValue: {
//                         select: (selector: any) => {
//                             if (selector === selectAccountId) {
//                                 return of('mockAccountId')
//                             }
//                             if (selector === selectSessionId) {
//                                 return of('mockSessionId')
//                             }
//                             return of(null)
//                         }
//                     }
//                 }
//             ]
//         })

//         service = TestBed.inject(MovieAPIService)
//         httpMock = TestBed.inject(HttpTestingController)
//         store = TestBed.inject(Store)
//     })

//     afterEach(() => {
//         httpMock.verify()
//     })

//     it('should fetch movie genres', () => {
//         service.getMovieGenre().subscribe((genres) => {
//             expect(genres).toEqual(mockGenreModule)
//         })

//         const req = httpMock.expectOne(`${environment.apiUrl}genre/movie/list?language=en`)
//         expect(req.request.method).toBe('GET')
//         req.flush(mockGenreModule)
//     })

//     it('should fetch movie list with category', () => {
//         const category = 'action'
//         service.getMovieListWitCat(category).subscribe((moviePage) => {
//             expect(moviePage).toEqual(mockMoviePage)
//         })

//         const req = httpMock.expectOne(`${environment.apiUrl}movie/${category}${environment.apiKey}`)
//         expect(req.request.method).toBe('GET')
//         req.flush(mockMoviePage)
//     })

//     it('should fetch favourite list from API', () => {
//         service.getFavouriteListFromApi().subscribe((moviePage) => {
//             expect(moviePage).toEqual(mockMoviePage)
//         })

//         const req = httpMock.expectOne(
//             `${environment.apiUrl}account/mockAccountId/favorite/movies?language=en-US&page=1&session_id=mockSessionId&sort_by=created_at.asc`
//         )
//         expect(req.request.method).toBe('GET')
//         req.flush(mockMoviePage)
//     })

//     it('should fetch watch list from API', () => {
//         service.getWatchListFromApi().subscribe((moviePage) => {
//             expect(moviePage).toEqual(mockMoviePage)
//         })

//         const req = httpMock.expectOne(
//             `${environment.apiUrl}account/mockAccountId/watchlist/movies?language=en-US&page=1&session_id=mockSessionId&sort_by=created_at.asc`
//         )
//         expect(req.request.method).toBe('GET')
//         req.flush(mockMoviePage)
//     })
// })
