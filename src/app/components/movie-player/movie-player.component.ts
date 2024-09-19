import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { SwiperContainer } from 'swiper/element'
@Component({
    selector: 'app-movie-player',
    standalone: true,
    imports: [],
    templateUrl: './movie-player.component.html',
    styleUrl: './movie-player.component.scss'
})
export class MoviePlayerComponent implements OnInit, AfterContentInit {
    @ViewChild('player') player!: ElementRef<HTMLIFrameElement>
    safeUrl?: SafeResourceUrl
    @Input() videoId: string | undefined
    constructor(private sanitizer: DomSanitizer) {}
    ngOnInit(): void {
        this.safeUrl = this.getSafeUrl(this.videoId!)
    }

    getSafeUrl(key: string): SafeResourceUrl {
        const url = `https://www.youtube.com/embed/${key}`
        return this.sanitizer.bypassSecurityTrustResourceUrl(url)
    }
    ngAfterContentInit(): void {
        console.log(this.player)
        const frame = document.getElementsByTagName('iframe')
        console.log(frame)
    }
}
