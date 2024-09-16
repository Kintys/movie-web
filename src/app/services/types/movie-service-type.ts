import { Genre, Movie } from '@/app/shared/type/movie'

export interface MoviePage {
    dates?: {
        maximum: string
        minimum: string
    }
    page: number
    results: Movie[]
    total_pages?: number
    total_results?: number
    category?: string | null
}
export interface CategoryMovies {
    [key: string]: string
    nowPlaying: string
    popular: string
    topRate: string
    upcoming: string
}
export interface GenreModule {
    genres: Genre[]
}
export interface VideoResult {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}

export interface ApiResponse {
    id: number
    results: VideoResult[]
}
