import { MovieAPIService } from '@/app/services/movie-api.service'
import { selectMovieWithCat } from '@/app/store/movie-store/movieSelector'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Store } from '@ngrx/store'
import { YoutubePlayerComponent } from 'ngx-youtube-player'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-player-list',
    standalone: true,
    imports: [YoutubePlayerComponent],
    templateUrl: './player-list.component.html',
    styleUrl: './player-list.component.scss'
})
export class PlayerListComponent implements OnInit {
    @Input() movieList: any
    @Output() movieId = new EventEmitter<string>()
    selectedMovie$!: Observable<any>
    constructor() {}
    ngOnInit(): void {}
    getNewDataFormat(dataValue: string) {
        const date = new Date(dataValue)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }
    sendMovieId(id: string) {
        this.movieId.emit(id)
    }
}
