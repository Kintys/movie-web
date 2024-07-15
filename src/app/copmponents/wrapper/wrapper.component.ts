import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-wrapper',
    standalone: true,
    imports: [],
    templateUrl: './wrapper.component.html',
    styleUrl: './wrapper.component.scss'
})
export class WrapperComponent implements OnInit {
    @Input() animationNumber?: number
    animationNumberArr?: number[]
    ngOnInit(): void {
        if (this.animationNumber)
            this.animationNumberArr = Array.from({ length: this.animationNumber }, (_, i) => i + 1)
    }
}
