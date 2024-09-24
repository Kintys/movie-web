import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { YoutubePlayerComponent } from 'ngx-youtube-player'
import { SliderModule } from 'primeng/slider'
import { BehaviorSubject, Subscription, interval } from 'rxjs'
@Component({
    selector: 'app-movie-player',
    standalone: true,
    imports: [YoutubePlayerComponent, SliderModule],
    templateUrl: './movie-player.component.html',
    styleUrl: './movie-player.component.scss'
})
export class MoviePlayerComponent implements OnInit, AfterContentInit {
    @ViewChild('timeline') timelineContainer: ElementRef | undefined
    safeUrl?: SafeResourceUrl
    @Input() id!: string
    player!: YT.Player
    currentVideoTime = new BehaviorSubject<string>('0')
    videoUpdateSubscription!: Subscription
    constructor(private sanitizer: DomSanitizer) {}
    ngOnInit(): void {
        this.safeUrl = this.getSafeUrl(this.id!)
    }

    getSafeUrl(key: string): SafeResourceUrl {
        const url = `https://www.youtube.com/embed/${key}`
        return this.sanitizer.bypassSecurityTrustResourceUrl(url)
    }
    ngAfterContentInit(): void {}

    getCurrentVideoTime() {
        return `${this.player.getCurrentTime() / this.player.getDuration()}`
    }
    savePlayer(player: any) {
        this.player = player
        console.log('player instance', player)
    }
    // onStateChange(event: any) {
    //     console.log('player state', event.data)
    // }
    showDuring($event: any) {
        console.log($event)
        const rect = this.timelineContainer?.nativeElement.getBoundingClientRect()
        console.log(rect)
        const time = Math.min(Math.max(0, $event.x - rect.x), rect.width) / rect.width
        this.player.seekTo(time * this.player.getDuration(), true)
    }
    showPlay() {
        this.player.playVideo()
        this.currentVideoTime.subscribe((val) => {
            document.body.style.setProperty('--progress-position', val)
            console.log(val)
        })
        this.videoUpdateSubscription = interval(100).subscribe(() => {
            const videoTime = this.getCurrentVideoTime()
            this.currentVideoTime.next(videoTime)
        })
    }
}
