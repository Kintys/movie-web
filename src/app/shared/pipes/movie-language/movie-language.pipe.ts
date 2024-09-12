import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'pipeMovieLanguage',
    standalone: true
})
export class MovieLanguagePipe implements PipeTransform {
    countries = [
        {
            sort: 'en',
            language: 'English'
        },
        {
            sort: 'fr',
            language: 'French'
        },
        {
            sort: 'de',
            language: 'German'
        },
        {
            sort: 'jp',
            language: 'Japanese'
        },
        {
            sort: 'es',
            language: 'Spanish'
        },
        {
            sort: 'it',
            language: 'Italian'
        },
        {
            sort: 'cn',
            language: 'Chinese'
        },
        {
            sort: 'br',
            language: 'Portuguese'
        },
        {
            sort: 'in',
            language: 'Hindi, English'
        },
        {
            sort: 'ca',
            language: 'English, French'
        },
        {
            sort: 'au',
            language: 'English'
        },
        {
            sort: 'mx',
            language: 'Spanish'
        }
    ]

    transform(value: string): string {
        if (!value) return ''
        const language = this.countries.find((item) => item.sort === value)?.language
        return !language ? ' ' : language
    }
}
