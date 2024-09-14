import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'rating',
    standalone: true
})
export class RatingPipe implements PipeTransform {
    transform(value: number): number {
        if (!value) return 5
        return Math.round(value / 2)
    }
}
