import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { YoutubePlayerComponent } from 'ngx-youtube-player'
import { SliderModule } from 'primeng/slider'
import { BehaviorSubject, Subject, Subscription, interval, takeUntil, throwIfEmpty } from 'rxjs'
@Component({
    selector: 'app-movie-player',
    standalone: true,
    imports: [YoutubePlayerComponent, SliderModule, FormsModule],
    templateUrl: './movie-player.component.html',
    styleUrl: './movie-player.component.scss'
})
export class MoviePlayerComponent implements OnInit, AfterContentInit {
    @ViewChild('timeline') timelineContainer: ElementRef | undefined
    @ViewChild('playerCont') playerContainer: ElementRef | undefined
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
    isScrubbing: boolean = false
    leadingZeroFormatter: any
    value!: string
    isFullScreen: boolean = false
    isShowInfo?: boolean
    constructor(private sanitizer: DomSanitizer) {}
    ngOnInit(): void {
        this.safeUrl = this.getSafeUrl(this.id!)
        this.leadingZeroFormatter = new Intl.NumberFormat('pl-PL', {
            minimumIntegerDigits: 2
        })
    }

    getSafeUrl(key: string): SafeResourceUrl {
        const url = `https://www.youtube.com/embed/${key}`
        return this.sanitizer.bypassSecurityTrustResourceUrl(url)
    }
    ngAfterContentInit(): void {
        this.statusVideo.subscribe((status) => {
            this.isShowInfo = false
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
                    this.isShowInfo = true
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
    toggleScrubbing(event: any) {
        const time = this.currentCoordinate(event)
        this.player.seekTo(time * this.player.getDuration(), true)
        this.currentVideoTime.next(`${time}`)
        this.stopInterval$.next()
    }
    handleTimelineUpdate(event: any) {
        const cursorPositionPercent = this.currentCoordinate(event)
        const hoverTime = cursorPositionPercent * this.player.getDuration()
        const currentHoverTime = this.formatDuration(hoverTime)
        this.timelineContainer?.nativeElement.style.setProperty('--preview-position', cursorPositionPercent)
        this.timelineContainer?.nativeElement.style.setProperty('--preview-time', `"${currentHoverTime}"`)
    }
    playVideo() {
        this.showVideoTimeLine()
        this.player.playVideo()
    }
    currentCoordinate(e: any): number {
        const rect = this.timelineContainer?.nativeElement.getBoundingClientRect()
        return Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
    }
    showVideoTimeLine() {
        this.videoUpdateSubscription = interval(100)
            .pipe(takeUntil(this.stopInterval$))
            .subscribe(() => {
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

    formatDuration(time: number) {
        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60) % 60
        const hours = Math.floor(time / 3600)
        if (hours === 0) {
            return `${minutes}:${this.leadingZeroFormatter.format(seconds)}`
        } else {
            return `${hours}:${this.leadingZeroFormatter.format(minutes)}:${this.leadingZeroFormatter.format(seconds)}`
        }
    }
    async fullScreen() {
        this.isFullScreen = !this.isFullScreen
        if (this.isFullScreen) {
            await this.playerContainer?.nativeElement.requestFullscreen()
            const playerWidth = this.playerContainer?.nativeElement.offsetWidth
            const playerHeight = this.playerContainer?.nativeElement.offsetHeight
            this.player.setSize(playerWidth, playerHeight)
        } else {
            await document.exitFullscreen()
            const playerWidth = this.playerContainer?.nativeElement.offsetWidth
            const playerHeight = this.playerContainer?.nativeElement.offsetHeight
            this.player.setSize(playerWidth, playerHeight)
        }
    }
    setNewValue(value: string) {
        this.player.setVolume(parseFloat(value))
    }
}
