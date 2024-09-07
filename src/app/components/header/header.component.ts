import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { ImageModule } from 'primeng/image'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { ActionTitle, HeaderLinkModule } from '@/app/shared/type/header'
import { v4 as uuidv4 } from 'uuid'
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, ButtonModule, ImageModule, IconFieldModule, InputIconModule, InputTextModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    headerLinks?: HeaderLinkModule[]
    actionsTitles?: ActionTitle
    @Output() openLoginPopup = new EventEmitter<boolean>()

    ngOnInit(): void {
        this.actionsTitles = {
            watchList: 'watch list',
            singIn: 'sign in',
            register: 'register'
        }

        this.headerLinks = [
            {
                id: uuidv4(),
                name: 'home',
                path: ''
            },
            { id: uuidv4(), name: 'movie', path: '/' },
            { id: uuidv4(), icon: true, name: 'live', path: '/' },
            { id: uuidv4(), name: 'series', path: '/' },
            { id: uuidv4(), name: 'kids', path: '/' }
        ]
    }
    onSingIn() {
        this.openLoginPopup.emit(true)
    }
}
