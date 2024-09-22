import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { YoutubePlayerComponent } from 'ngx-youtube-player'

import { SwiperContainer } from 'swiper/element'
@Component({
    selector: 'app-movie-player',
    standalone: true,
    imports: [YoutubePlayerComponent],
    templateUrl: './movie-player.component.html',
    styleUrl: './movie-player.component.scss'
})
export class MoviePlayerComponent implements OnInit, AfterContentInit {
    @ViewChild('iframe') iframe!: ElementRef<HTMLIFrameElement>
    safeUrl?: SafeResourceUrl
    @Input() id!: string
    player!: YT.Player
    constructor(private sanitizer: DomSanitizer) {}
    ngOnInit(): void {
        this.safeUrl = this.getSafeUrl(this.id!)
    }

    getSafeUrl(key: string): SafeResourceUrl {
        const url = `https://www.youtube.com/embed/${key}`
        return this.sanitizer.bypassSecurityTrustResourceUrl(url)
    }
    ngAfterContentInit(): void {}
    savePlayer(player: any) {
        this.player = player
        console.log('player instance', player)
    }
    onStateChange(event: any) {
        console.log('player state', event.data)
    }
    showPlay() {
        // this.player.playVideo()
        console.log(this.iframe)
        // if (this.iframe && this.iframe.nativeElement.contentWindow) {
        //     let iframeDocument =
        //         this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow.document

        //     let button = document.querySelector(
        //         '.ytp-unmute.ytp-popup.ytp-button.ytp-unmute-animated.ytp-unmute-shrink'
        //     )
        //     console.log(button)
        // if (button) {
        //     ;(button as HTMLElement).style.display = 'none'
        // }
        // }
    }
}
