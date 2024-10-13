import { MovieLanguagePipe } from '@/app/shared/pipes/movie-language/movie-language.pipe'
import { RatingPipe } from '@/app/shared/pipes/movie-rating/rating.pipe'
import { Movie } from '@/app/shared/type/movie'
import { AsyncPipe } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { RatingModule } from 'primeng/rating'

@Component({
    selector: 'app-movie-description',
    standalone: true,
    imports: [ButtonModule, MovieLanguagePipe, RatingModule, FormsModule, RatingPipe, AsyncPipe],
    templateUrl: './movie-description.component.html',
    styleUrl: './movie-description.component.scss'
})
export class MovieDescriptionComponent {
    @Input() movieDescription?: Movie
}
