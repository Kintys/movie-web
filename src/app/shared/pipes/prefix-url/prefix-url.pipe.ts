import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'prefixUrl',
    standalone: true
})
export class PrefixUrlPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) return ''
        return `https://image.tmdb.org/t/p/w500/${value}`
    }
}
