import { Pipe, PipeTransform } from '@angular/core'
import { MovieAPIService } from '@/app/services/movie-api.service'
import { Observable, map } from 'rxjs'
import { Language } from './module'

@Pipe({
    name: 'pipeMovieLanguage',
    standalone: true
})
export class MovieLanguagePipe implements PipeTransform {
    countries$: Observable<Language[]>
    constructor(private languageService: MovieAPIService) {
        this.countries$ = this.languageService.getLanguage()
    }

    transform(value: string): Observable<string> {
        return this.countries$.pipe(
            map((countries) => {
                const foundLanguage = countries.find((item) => item.iso_639_1 === value)?.english_name
                return !foundLanguage ? ' ' : foundLanguage
            })
        )
    }
}
