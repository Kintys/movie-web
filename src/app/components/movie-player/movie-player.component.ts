import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { YoutubePlayerComponent } from 'ngx-youtube-player'
import { SliderModule } from 'primeng/slider'
import { BehaviorSubject, Subject, Subscription, interval, takeUntil } from 'rxjs'
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
    statusVideo = new BehaviorSubject<number>(0)
    videoUpdateSubscription!: Subscription
    bufferCurrentTime$ = new BehaviorSubject<string>('0')
    bufferUpdateSubscription$!: Subscription
    stopBufferInterval$ = new Subject<void>()
    stopInterval$ = new Subject<void>()
    constructor(private sanitizer: DomSanitizer) {}
    ngOnInit(): void {
        this.safeUrl = this.getSafeUrl(this.id!)
    }

    getSafeUrl(key: string): SafeResourceUrl {
        const url = `https://www.youtube.com/embed/${key}`
        return this.sanitizer.bypassSecurityTrustResourceUrl(url)
    }
    ngAfterContentInit(): void {
        this.statusVideo.subscribe((status) => {
            switch (status) {
                case 1:
                    this.playVideo()
                    break
                case 2:
                    this.stopVideo()
                    break
                case 3:
                    this.bufferTimeline()
                    break
                case 0:
                    this.endVideo()
                    break
                default:
                    break
            }
        })
    }
    getCurrentVideoTime() {
        return (this.player.getCurrentTime() / this.player.getDuration()).toString()
    }
    savePlayer(player: any) {
        this.player = player
    }
    onStateChange(event: any) {
        this.statusVideo.next(event.data)
    }
    showDuring($event: any) {
        const rect = this.timelineContainer?.nativeElement.getBoundingClientRect()
        const time = Math.min(Math.max(0, $event.x - rect.x), rect.width) / rect.width
        this.currentVideoTime.next(this.getCurrentVideoTime())
        this.player.seekTo(time * this.player.getDuration(), true)
        // this.showVideoTimeLine()

        this.currentVideoTime.subscribe((val) => {
            this.timelineContainer?.nativeElement.style.setProperty('--progress-position', val)
        })
    }
    playVideo() {
        this.showVideoTimeLine()
        this.player.playVideo()
    }
    showVideoTimeLine() {
        this.videoUpdateSubscription = interval(100)
            .pipe(takeUntil(this.stopInterval$))
            .subscribe(() => {
                console.log(2123)
                this.currentVideoTime.next(this.getCurrentVideoTime())
            })
        this.currentVideoTime.subscribe((val) => {
            this.timelineContainer?.nativeElement.style.setProperty('--progress-position', val)
        })
    }
    stopVideo() {
        this.player.pauseVideo()
        this.stopInterval$.next()
    }
    bufferTimeline() {
        this.bufferUpdateSubscription$ = interval(1000)
            .pipe(takeUntil(this.stopBufferInterval$))
            .subscribe(() => this.bufferCurrentTime$.next(this.player.getVideoLoadedFraction().toString()))
        this.bufferCurrentTime$.pipe(takeUntil(this.stopBufferInterval$)).subscribe((timeUpdate) => {
            if (timeUpdate === '1') this.stopBufferInterval$.next()
            this.timelineContainer?.nativeElement.style.setProperty('--buffering-progress', timeUpdate)
        })
    }
    endVideo() {
        this.stopInterval$.next()
        this.currentVideoTime.next('1')
    }
}
